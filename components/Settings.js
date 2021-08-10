import React from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AktivityTracker from "./AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import PrimaryButton from "./PrimaryButton.js";
import Parse, { User } from "parse/react-native";

const habits = SQLite.openDatabase("habits.db");
const goals = SQLite.openDatabase("goals.db");
const aktivities = SQLite.openDatabase("aktivitys.db");

const IDLE = "IDLE";
const SYNCING = "SYNCRONIZING";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "ffffff",
      state: IDLE,
      updatedHabits: null,
      updatedHabitEntrys: null,
      updatedGoals: null,
      updatedAktivities: null,
      updatedTrackings: null,
    };
    this.loadData();
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        if (this.props.route.params && this.props.route.params.synchronize)
          this.syncronize();
      }
    );
  }
  handleInputChange = (input) => {
    if (input.length <= 7) {
      let good = true;
      for (let i = 1; i < input.length; i++) {
        const letter = input[i];
        if (
          !(
            +letter ||
            letter === "0" ||
            letter === "a" ||
            letter === "A" ||
            letter === "b" ||
            letter === "B" ||
            letter === "c" ||
            letter === "C" ||
            letter === "D" ||
            letter === "d" ||
            letter === "e" ||
            letter === "E" ||
            letter === "F" ||
            letter === "f"
          )
        )
          good = false;
      }
      if (good) {
        this.setState({ color: input });
      }
    }
  };
  loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("color");
      if (value !== null) {
        this.setState({ color: value });
      }
    } catch (e) {}
  };
  save = async () => {
    try {
      if (
        !(this.state.color.length === 4 || this.state.color.length === 7) &&
        !this.state.color[0] === "#"
      ) {
        alert(
          "Ungülite Eingabe. Bitte in der Form #xxx oder #xxxxxx eingeben."
        );
        return;
      }
      await AsyncStorage.setItem("color", this.state.color);
      alert("Gespeichert. Bitte App neu starten.");
    } catch (e) {}
  };

  syncronize = async () => {
    this.setState({ state: SYNCING });
    const currentUser = await Parse.User.currentAsync();
    if (currentUser === null) {
      this.props.navigation.navigate("Login");
      this.setState({ state: IDLE });
      return;
    }
    /* start with the habits */
    habits.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits",
        null,
        (txObj, { rows: { _array } }) => {
          this.saveHabits(_array, currentUser);
        }
      );
    });
    /* continue with the goals */
    goals.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goals",
        null,
        (txObj, { rows: { _array } }) => {
          this.saveGoals(_array, currentUser);
        }
      );
    });
    /* continue with the aktivities */
    aktivities.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities",
        null,
        (txObj, { rows: { _array } }) => {
          this.saveAktivities(_array, currentUser);
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  saveHabits = async (_array, currentUser) => {
    let count = 0;
    for (let i = 0; i < _array.length; i++) {
      const habit = _array[i];
      let Habit = new Parse.Object("Habit");
      if (habit.object_id) {
        let query = new Parse.Query("Habit");
        query.equalTo("objectId", habit.object_id + "");
        const result = await query.find();
        const version = result[0].get("version");
        if (habit.version <= version) continue;
        Habit.set("objectId", habit.object_id + "");
      }
      if (!habit.object_id && habit.deleted) continue;
      Habit.set("version", habit.version);
      Habit.set("deleted", habit.deleted);
      Habit.set("user", currentUser);
      Habit.set("icon", habit.icon);
      Habit.set("intervall", habit.intervall);
      Habit.set("name", habit.name);
      Habit.set("priority", habit.priority);
      Habit.set("repetitions", habit.repetitions);
      Habit.set("queue", habit.queue);
      try {
        const savedHabit = await Habit.save();
        count++;
        console.log("Saved ", habit.name);
        habits.transaction((tx) => {
          tx.executeSql(
            "UPDATE habits SET object_id = ? WHERE id = ?",
            [savedHabit.id, habit.id],
            () => {},
            (txObj, error) => {
              console.log(error);
            }
          );
        });
      } catch (error) {
        console.log("Error when saving ", habit.name, " ", error);
      }
    }
    try {
      let query = new Parse.Query("Habit");
      query.equalTo("user", currentUser);
      let queryResults = await query.find();
      this.factorInHabits(queryResults, count);
    } catch (error) {
      console.error(error);
    }

    habits.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits JOIN checkHabits WHERE checkHabits.habit_id = habits.id",
        null,
        (txObj, { rows: { _array } }) => {
          this.saveHabitChecks(_array, currentUser);
        }
      );
    });
  };

  factorInHabits = async (array, count) => {
    for (let i = 0; i < array.length; i++) {
      const habit = array[i];
      habits.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM habits WHERE object_id = ?",
          [habit.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              habits.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO habits (name, priority, intervall, repetitions, icon, queue, object_id, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
                  [
                    habit.get("name"),
                    habit.get("priority"),
                    habit.get("intervall"),
                    habit.get("repetitions"),
                    habit.get("icon"),
                    habit.get("queue"),
                    habit.id,
                    habit.get("version"),
                  ],
                  () => {
                    count++;
                    console.log("Inserted ", habit.get("name"));
                  },
                  (txObj, error) => {
                    console.log(
                      "Error inserting ",
                      habit.get("name"),
                      ":",
                      error
                    );
                  }
                );
              });
            } else {
              if (_array[0].version < habit.get("version"))
                habits.transaction((tx) => {
                  tx.executeSql(
                    "UPDATE habits SET name=?, intervall=?, priority=?, repetitions=?, icon=?, queue=?, version=?, deleted=? WHERE object_id=?",
                    [
                      habit.get("name"),
                      habit.get("intervall"),
                      habit.get("priority"),
                      habit.get("repetitions"),
                      habit.get("icon"),
                      habit.get("queue"),
                      habit.get("version"),
                      habit.get("deleted"),
                      habit.id,
                    ],
                    () => {
                      count++;
                      console.log("Updated ", habit.get("name"));
                    },
                    (txObj, error) => {
                      console.log(
                        "Error updating ",
                        habit.get("name"),
                        ":",
                        error
                      );
                    }
                  );
                });
            }
          }
        );
      });
    }
    this.setState({ updatedHabits: count });
  };

  saveHabitChecks = async (_array, currentUser) => {
    let count = 0;
    for (let i = 0; i < _array.length; i++) {
      const habit_entry = _array[i];
      let Habit_Entry = new Parse.Object("Habit_Entry");
      if (habit_entry.object_id === null) {
        alert("Something went wrong. Please try again.");
        return;
      }
      if (habit_entry.object_id_check) {
        let query = new Parse.Query("Habit_Entry");
        query.equalTo("objectId", habit_entry.object_id_check + "");
        const result = await query.find();
        const version = result[0].get("version");
        if (habit_entry.version <= version) continue;
        Habit_Entry.set("objectId", habit_entry.object_id_check + "");
      }
      let Habit = new Parse.Object("Habit");
      Habit.set("objectId", habit_entry.object_id);
      Habit_Entry.set("deleted", habit_entry.deleted);
      Habit_Entry.set("user", currentUser);
      Habit_Entry.set("habit", Habit);
      Habit_Entry.set("date", habit_entry.date);
      try {
        const savedHabitEntry = await Habit_Entry.save();
        console.log("Saved Habit Entry. ");
        count++;
        habits.transaction((tx) => {
          tx.executeSql(
            "UPDATE checkHabits SET object_id_check = ? WHERE id = ?",
            [savedHabitEntry.id, habit_entry.id],
            () => {},
            (txObj, error) => {
              console.log(error);
            }
          );
        });
      } catch (error) {
        console.log("Error when saving ", habit_entry.name, " Entry ", error);
      }
    }
    try {
      let query = new Parse.Query("Habit_Entry");
      query.equalTo("user", currentUser);
      let queryResults = await query.find();
      this.factorInHabitEntrys(queryResults, count);
    } catch (error) {
      console.error(error);
    }
  };

  factorInHabitEntrys = async (array, count) => {
    for (let i = 0; i < array.length; i++) {
      const habit_entry = array[i];
      habits.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM checkHabits WHERE object_id_check = ?",
          [habit_entry.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              if (!habit_entry.get("deleted"))
                habits.transaction((tx) => {
                  tx.executeSql(
                    "SELECT id FROM habits WHERE object_id = ?",
                    [habit_entry.get("habit").id],
                    (txObj, { rows: { _array } }) => {
                      if (_array.length === 0) {
                        alert(
                          "Something went wrong with the Habit Entrys. Please try again."
                        );
                        return;
                      }
                      tx.executeSql(
                        "INSERT INTO checkHabits (habit_id, date, object_id_check, version) VALUES (?, ?, ?, ?);",
                        [
                          _array[0].id,
                          habit_entry.get("date"),
                          habit_entry.id,
                          habit_entry.get("version"),
                        ],
                        () => {
                          count++;
                          console.log("Inserted ", habit_entry.id);
                        },
                        (txObj, error) => {
                          console.log(
                            "Error inserting ",
                            habit_entry.id,
                            ":",
                            error
                          );
                        }
                      );
                    }
                  );
                });
            } else {
              if (_array[0].version < habit_entry.get("version"))
                habits.transaction((tx) => {
                  tx.executeSql(
                    "SELECT id FROM habits WHERE object_id = ?",
                    [habit_entry.get("habit").id],
                    (txObj, { rows: { _array } }) => {
                      if (_array.length === 0) {
                        alert(
                          "Something went wrong with the Habit Entrys. Please try again."
                        );
                        return;
                      }
                      tx.executeSql(
                        "UPDATE checkHabits SET date=?, habit_id=?, version=?, deleted=? WHERE object_id_check=?",
                        [
                          habit_entry.get("date"),
                          _array[0].id,
                          habit_entry.get("version"),
                          habit_entry.get("deleted"),
                          habit_entry.id,
                        ],
                        () => {
                          count++;
                          console.log("Updated ", habit_entry.id);
                        },
                        (txObj, error) => {
                          console.log(
                            "Error updating ",
                            habit_entry.id,
                            ":",
                            error
                          );
                        }
                      );
                    }
                  );
                });
            }
          }
        );
      });
    }
    this.setState({ updatedHabitEntrys: count });
  };

  saveGoals = async (_array, currentUser) => {
    let count = 0;
    for (let i = 0; i < _array.length; i++) {
      const goal = _array[i];
      let Goal = new Parse.Object("Goal");
      if (goal.object_id) {
        let query = new Parse.Query("Goal");
        query.equalTo("objectId", goal.object_id + "");
        const result = await query.find();
        const version = result[0].get("version");
        if (goal.version <= version) continue;
        Goal.set("objectId", goal.object_id + "");
      }
      Goal.set("version", goal.version);
      Goal.set("deleted", goal.deleted);
      Goal.set("user", currentUser);
      Goal.set("icon", goal.icon);
      Goal.set("intervall", goal.intervall);
      Goal.set("name", goal.name);
      Goal.set("priority", goal.priority);
      Goal.set("repetitions", goal.repetitions);
      Goal.set("time", goal.time);
      Goal.set("act_id", goal.act_id);
      Goal.set("archive", goal.archive);
      Goal.set("progress", goal.progress);
      try {
        const savedGoal = await Goal.save();
        count++;
        console.log("Saved ", goal.name);
        goals.transaction((tx) => {
          tx.executeSql(
            "UPDATE goals SET object_id = ? WHERE id = ?",
            [savedGoal.id, goal.id],
            () => {},
            (txObj, error) => {
              console.log(error);
            }
          );
        });
      } catch (error) {
        console.log("Error when saving ", goal.name, " ", error);
      }
    }
    try {
      let query = new Parse.Query("Goal");
      query.equalTo("user", currentUser);
      let queryResults = await query.find();
      this.facotrInGoals(queryResults, count);
    } catch (error) {
      console.error(error);
    }
  };

  facotrInGoals = async (array, count) => {
    for (let i = 0; i < array.length; i++) {
      const goal = array[i];
      goals.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM goals WHERE object_id = ?",
          [goal.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              goals.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO goals (name, priority, intervall, repetitions, icon, time, progress, act_id, object_id, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                  [
                    goal.get("name"),
                    goal.get("priority"),
                    goal.get("intervall"),
                    goal.get("repetitions"),
                    goal.get("icon"),
                    goal.get("time"),
                    goal.get("progress"),
                    goal.get("act_id"),
                    goal.id,
                    goal.get("version"),
                  ],
                  () => {
                    count++;
                    console.log("Inserted ", goal.get("name"));
                  },
                  (txObj, error) => {
                    console.log(
                      "Error inserting ",
                      goal.get("name"),
                      ":",
                      error
                    );
                  }
                );
              });
            } else {
              if (_array[0].version < goal.get("version"))
                goals.transaction((tx) => {
                  tx.executeSql(
                    "UPDATE goals SET name=?, intervall=?, priority=?, repetitions=?, icon=?, progress=?, time=?, act_id=?, version=?, deleted=? WHERE object_id=?",
                    [
                      goal.get("name"),
                      goal.get("intervall"),
                      goal.get("priority"),
                      goal.get("repetitions"),
                      goal.get("icon"),
                      goal.get("progress"),
                      goal.get("time"),
                      goal.get("act_id"),
                      goal.get("version"),
                      goal.get("deleted"),
                      goal.id,
                    ],
                    () => {
                      count++;
                      console.log("Updated ", goal.get("name"));
                    },
                    (txObj, error) => {
                      console.log(
                        "Error updating ",
                        goal.get("name"),
                        ":",
                        error
                      );
                    }
                  );
                });
            }
          }
        );
      });
    }
    this.setState({ updatedGoals: count });
  };

  saveAktivities = async (_array, currentUser) => {
    let count = 0;
    for (let i = 0; i < _array.length; i++) {
      const aktivity = _array[i];
      let Aktivity = new Parse.Object("Aktivity");
      if (aktivity.object_id) {
        let query = new Parse.Query("Aktivity");
        query.equalTo("objectId", aktivity.object_id + "");
        const result = await query.find();
        const version = result[0].get("version");
        if (aktivity.version <= version) continue;
        Aktivity.set("objectId", aktivity.object_id + "");
      }
      Aktivity.set("version", aktivity.version);
      Aktivity.set("deleted", aktivity.deleted);
      Aktivity.set("user", currentUser);
      Aktivity.set("icon", aktivity.icon);
      Aktivity.set("name", aktivity.name);
      Aktivity.set("id", aktivity.id);
      Aktivity.set("color", aktivity.color);
      try {
        const savedAktivity = await Aktivity.save();
        count++;
        console.log("Saved ", aktivity.name);
        aktivities.transaction((tx) => {
          tx.executeSql(
            "UPDATE activities SET object_id = ? WHERE id = ?",
            [savedAktivity.id, aktivity.id],
            () => {},
            (txObj, error) => {
              console.log(error);
            }
          );
        });
      } catch (error) {
        console.log("Error when saving ", aktivity.name, " ", error);
      }
    }
    try {
      let query = new Parse.Query("Aktivity");
      query.equalTo("user", currentUser);
      let queryResults = await query.find();
      this.factorInAktivitys(queryResults, count);
    } catch (error) {
      console.error(error);
    }

    aktivities.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities JOIN trackings WHERE trackings.act_id = activities.id",
        null,
        (txObj, { rows: { _array } }) => {
          this.saveTrackings(_array, currentUser);
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  factorInAktivitys = async (array, count) => {
    for (let i = 0; i < array.length; i++) {
      const aktivity = array[i];
      aktivities.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM activities WHERE object_id = ?",
          [aktivity.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              if (!aktivity.get("deleted"))
                aktivities.transaction((tx) => {
                  tx.executeSql(
                    "INSERT INTO activities (name, icon, color, object_id, version) VALUES (?, ?, ?, ?, ?);",
                    [
                      aktivity.get("name"),
                      aktivity.get("icon"),
                      aktivity.get("color"),
                      aktivity.id,
                      aktivity.get("version"),
                    ],
                    () => {
                      count++;
                      console.log("Inserted ", aktivity.get("name"));
                    },
                    (txObj, error) => {
                      console.log(
                        "Error inserting ",
                        aktivity.get("name"),
                        ":",
                        error
                      );
                    }
                  );
                });
            } else {
              if (_array[0].version < aktivity.get("version"))
                aktivities.transaction((tx) => {
                  tx.executeSql(
                    "UPDATE activities SET name=?, icon=?, color=?, version=?, deleted=? WHERE object_id=?",
                    [
                      aktivity.get("name"),
                      aktivity.get("icon"),
                      aktivity.get("color"),
                      aktivity.get("version"),
                      aktivity.get("deleted"),
                      aktivity.id,
                    ],
                    () => {
                      count++;
                      console.log("Updated ", aktivity.get("name"));
                    },
                    (txObj, error) => {
                      console.log(
                        "Error updating ",
                        aktivity.get("name"),
                        ":",
                        error
                      );
                    }
                  );
                });
            }
          }
        );
      });
    }
    this.setState({ updatedAktivities: count });
  };

  saveTrackings = async (_array, currentUser) => {
    let count = 0;
    for (let i = 0; i < _array.length; i++) {
      const tracking = _array[i];
      let Tracking = new Parse.Object("Tracking");
      if (tracking.object_id === null) {
        alert("Something went wrong. Please try again.");
        return;
      }
      if (tracking.object_id_tracking) {
        let query = new Parse.Query("Tracking");
        query.equalTo("objectId", tracking.object_id_tracking + "");
        const result = await query.find();
        const version = result[0].get("version");
        if (tracking.version <= version) continue;
        Tracking.set("objectId", tracking.object_id_tracking + "");
      }
      let Aktivity = new Parse.Object("Aktivity");
      Aktivity.set("objectId", tracking.object_id);
      Tracking.set("deleted", tracking.deleted);
      Tracking.set("user", currentUser);
      Tracking.set("aktivity", Aktivity);
      Tracking.set("start_time", tracking.start_time);
      Tracking.set("end_time", tracking.end_time);
      Tracking.set("duration_s", tracking.duration_s);
      Tracking.set("version", tracking.version);
      try {
        const savedTracking = await Tracking.save();
        count++;
        console.log("Saved Tracking Entry. ");
        aktivities.transaction((tx) => {
          tx.executeSql(
            "UPDATE trackings SET object_id_tracking = ? WHERE id = ?",
            [savedTracking.id, tracking.id],
            () => {},
            (txObj, error) => {
              console.log(error);
            }
          );
        });
      } catch (error) {
        console.log("Error when saving ", tracking.name, " Entry ", error);
      }
    }
    try {
      let query = new Parse.Query("Tracking");
      query.equalTo("user", currentUser);
      let queryResults = await query.find();
      this.factorInTrackings(queryResults, count);
    } catch (error) {
      console.error(error);
    }
  };

  factorInTrackings = async (array, count) => {
    for (let i = 0; i < array.length; i++) {
      const tracking = array[i];
      aktivities.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM trackings WHERE object_id_tracking = ?",
          [tracking.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              if (!tracking.get("deleted"))
                aktivities.transaction((tx) => {
                  tx.executeSql(
                    "SELECT id FROM activities WHERE object_id = ?",
                    [tracking.get("aktivity").id],
                    (txObj, { rows: { _array } }) => {
                      if (_array.length === 0) {
                        alert(
                          "Something went wrong with the trackings. Please try again."
                        );
                        return;
                      }
                      tx.executeSql(
                        "INSERT INTO trackings (act_id, start_time, end_time, duration_s, object_id_tracking, version) VALUES (?, ?, ?, ?, ?, ?);",
                        [
                          _array[0].id,
                          tracking.get("start_time"),
                          tracking.get("end_time"),
                          tracking.get("duration_s"),
                          tracking.id,
                          tracking.get("version"),
                        ],
                        () => {
                          count++;
                          console.log("Inserted ", tracking.id);
                        },
                        (txObj, error) => {
                          console.log(
                            "Error inserting ",
                            tracking.id,
                            ":",
                            error
                          );
                        }
                      );
                    }
                  );
                });
            } else {
              if (_array[0].version < tracking.get("version"))
                aktivities.transaction((tx) => {
                  tx.executeSql(
                    "SELECT id FROM activities WHERE object_id = ?",
                    [tracking.get("aktivity").id],
                    (txObj, { rows: { _array } }) => {
                      if (_array.length === 0) {
                        alert(
                          "Something went wrong with the trackings. Please try again."
                        );
                        return;
                      }
                      tx.executeSql(
                        "UPDATE trackings SET act_id=?, start_time=?, end_time=?, duration_s=?, version=?, deleted=? WHERE object_id_tracking=?",
                        [
                          _array[0].id,
                          tracking.get("start_time"),
                          tracking.get("end_time"),
                          tracking.get("duration_s"),
                          tracking.get("version"),
                          tracking.get("deleted"),
                          tracking.id,
                        ],
                        () => {
                          count++;
                          console.log("Updated ", tracking.id);
                        },
                        (txObj, error) => {
                          console.log(
                            "Error updating ",
                            tracking.id,
                            ":",
                            error
                          );
                        }
                      );
                    }
                  );
                });
            }
          }
        );
      });
    }
    this.setState({ updatedTrackings: count });
  };

  componentDidUpdate() {
    if (
      this.state.updatedAktivities !== null &&
      this.state.updatedGoals !== null &&
      this.state.updatedHabitEntrys !== null &&
      this.state.updatedHabits !== null &&
      this.state.updatedTrackings !== null &&
      this.state.state === SYNCING
    ) {
      alert(
        `Synchronisation erfolgreich. Updated: ${this.state.updatedAktivities} Aktivities, ${this.state.updatedGoals} Goals, ${this.state.updatedHabitEntrys} Habit Entries, ${this.state.updatedHabits} Habits, ${this.state.updatedTrackings} Trackings. `
      );
      this.setState({
        state: IDLE,
        updatedAktivities: null,
        updatedTrackings: null,
        updatedGoals: null,
        updatedHabitEntrys: null,
        updatedHabits: null,
      });
    }
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.state === SYNCING}
            onRefresh={() => {
              this.syncronize();
            }}
          />
        }
      >
        <TextInput
          style={[
            styles.normalText,
            styles.padding,
            styles.margin,
            styles.textInputLarge,
            { borderColor: global.color, color: global.color },
          ]}
          placeholder="#"
          onChangeText={this.handleInputChange}
          value={this.state.color}
        ></TextInput>
        <ColorPicker
          color={this.state.color}
          onColorChange={(color) => {
            this.setState({ color: fromHsv(color) });
          }}
          style={{ height: 500 }}
        />
        <PrimaryButton onPress={this.save} text={"Speichern"} />
        <PrimaryButton onPress={this.syncronize} text={"Synchronisieren"} />
        <PrimaryButton
          onPress={async () => {
            try {
              await Parse.User.logOut();
              const currentUser = await Parse.User.currentAsync();
              if (currentUser === null) alert("Successfully logged out.");
            } catch (error) {
              alert("Error when loggin out.");
            }
          }}
          text={"logout"}
        />
      </ScrollView>
    );
  }
}

export default Settings;
