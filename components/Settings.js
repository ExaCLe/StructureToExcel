import React from "react";
import { Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
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

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "ffffff" };
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
    const currentUser = await Parse.User.currentAsync();
    if (currentUser === null) {
      this.props.navigation.navigate("Login");
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
  };

  saveHabits = async (_array, currentUser) => {
    for (let i = 0; i < _array.length; i++) {
      const habit = _array[i];
      let Habit = new Parse.Object("Habit");
      if (habit.object_id) {
        let query = new Parse.Query("Habit");
        query.equalTo("objectId", habit.object_id + "");
        const result = await query.find();
        const version = result[0].get("version");
        if (habit.version < version) continue;
        Habit.set("objectId", habit.object_id + "");
      }
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
      this.factorInHabits(queryResults);
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

  factorInHabits = async (array) => {
    for (let i = 0; i < array.length; i++) {
      const habit = array[i];
      if (habit.get("deleted")) continue;
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
  };

  saveHabitChecks = async (_array, currentUser) => {
    for (let i = 0; i < _array.length; i++) {
      const habit_entry = _array[i];
      let Habit_Entry = new Parse.Object("Habit_Entry");
      if (habit_entry.object_id === null) {
        alert("Something went wrong. Please try again.");
        return;
      }
      if (habit_entry.object_id_check) {
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
  };

  saveGoals = async (_array, currentUser) => {
    for (let i = 0; i < _array.length; i++) {
      const goal = _array[i];
      let Goal = new Parse.Object("Goal");
      if (goal.object_id) {
        let query = new Parse.Query("Goal");
        query.equalTo("objectId", goal.object_id + "");
        const result = await query.find();
        const version = result[0].get("version");
        if (goal.version < version) continue;
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
      this.facotrInGoals(queryResults);
    } catch (error) {
      console.error(error);
    }
  };

  facotrInGoals = async (array) => {
    for (let i = 0; i < array.length; i++) {
      const goal = array[i];
      if (goal.get("deleted")) continue;
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
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
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
