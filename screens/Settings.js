import React from "react";
import { RefreshControl, ScrollView, Text, TextInput } from "react-native";
import AktivityTracker from "./components/AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import PrimaryButton from "./components/PrimaryButton.js";
import Parse, { User } from "parse/react-native";
import { saveHabits } from "../helpers/synchronize/Habits.js";
import { saveAktivities } from "../helpers/synchronize/Aktivities.js";
import { saveGoals } from "../helpers/synchronize/Goals.js";
import { saveTrackings } from "../helpers/synchronize/Trackings.js";
import { saveHabitChecks } from "../helpers/synchronize/HabitEntrys.js";
import TextButton from "./components/TextButton.js";
import TextfieldAndLabel from "./components/TextfieldAndLabel.js";
import PopUp from "./components/PopUp.js";

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
        async (txObj, { rows: { _array } }) => {
          const updatedHabits = await saveHabits(_array, currentUser);
          this.setState({ updatedHabits: updatedHabits });
        }
      );
    });
    habits.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits JOIN checkHabits WHERE checkHabits.habit_id = habits.id",
        null,
        async (txObj, { rows: { _array } }) => {
          const updatedHabitEntrys = await saveHabitChecks(_array, currentUser);
          this.setState({ updatedHabitEntrys: updatedHabitEntrys });
        }
      );
    });
    /* continue with the goals */
    goals.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goals",
        null,
        async (txObj, { rows: { _array } }) => {
          const updatedGoals = await saveGoals(_array, currentUser);
          this.setState({ updatedGoals: updatedGoals });
        }
      );
    });
    /* continue with the aktivities */
    aktivities.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities",
        null,
        async (txObj, { rows: { _array } }) => {
          const updatedAktivities = await saveAktivities(_array, currentUser);
          this.setState({ updatedAktivities: updatedAktivities });
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
    aktivities.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities JOIN trackings WHERE trackings.act_id = activities.id",
        null,
        async (txObj, { rows: { _array } }) => {
          const updatedTrackings = await saveTrackings(_array, currentUser);
          this.setState({ updatedTrackings: updatedTrackings });
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
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
        style={styles.mainContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.state === SYNCING}
            onRefresh={() => {
              this.syncronize();
            }}
          />
        }
      >
        <Text style={styles.h1}>Verändern des Designs:</Text>
        <TextfieldAndLabel
          onChangeText={this.handleInputChange}
          label="App Hauptfarbe:"
          value={this.state.color}
          width="50%"
          style={styles.topDownMargin}
        />
        <TextButton
          text={"Show Color Picker"}
          onPress={() => this.setState({ showColorPicker: true })}
        />
        <PopUp
          visible={this.state.showColorPicker}
          close={() =>
            this.setState({
              showColorPicker: false,
            })
          }
        >
          <ColorPicker
            color={this.state.color}
            onColorChange={(color) => {
              this.setState({ color: fromHsv(color) });
            }}
            style={{ height: 400 }}
          />
        </PopUp>

        <PrimaryButton
          onPress={this.save}
          text={"Farbe Speichern"}
          style={[styles.topDownMargin, styles.smallDownMargin]}
        />

        <Text style={[styles.h1]}>Synchronisieren mit der Cloud:</Text>
        <PrimaryButton
          onPress={this.syncronize}
          text={"Synchronisieren"}
          style={styles.topDownMargin}
        />
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
          text={"Ausloggen"}
          style={styles.smallDownMargin}
        />

        <Text style={[styles.h1]}>Löschen der Daten:</Text>
        <PrimaryButton
          text="Clear Habits Database"
          onPress={() => {
            habits.transaction((tx) => {
              tx.executeSql("DELETE FROM habits", null, null, (txObj, error) =>
                console.log(error)
              );
              tx.executeSql("DELETE FROM checkHabits", null, () => {
                alert("Deleted Database.", (txObj, error) =>
                  console.log(error)
                );
              });
            });
          }}
          style={styles.topDownMargin}
        />
        <PrimaryButton
          text="Clear Goals Database"
          onPress={() => {
            goals.transaction((tx) => {
              tx.executeSql("DELETE FROM goals", null, () => {
                alert("Deleted database. ", (txObj, error) =>
                  console.log(error)
                );
              });
            });
          }}
        />
        <PrimaryButton
          text="Clear Aktivities Databasse"
          onPress={() => {
            aktivities.transaction((tx) => {
              tx.executeSql(
                "DELETE FROM activities",
                null,
                null,
                (txObj, error) => console.log(error)
              );
              tx.executeSql("DELETE FROM trackings", null, () => {
                alert("Database deleted.");
              });
            });
          }}
          style={styles.smallDownMargin}
        />
        <PrimaryButton
          text="Reset All"
          onPress={() => {
            aktivities.transaction((tx) => {
              tx.executeSql(
                "DROP  TABLE activities",
                null,
                null,
                (txObj, error) => console.log(error)
              );
              tx.executeSql("DROP TABLE trackings", null, () => {
                alert("Database deleted.");
              });
            });
            goals.transaction((tx) => {
              tx.executeSql("DROP TABLE goals", null, () => {
                alert("Deleted database. ", (txObj, error) =>
                  console.log(error)
                );
              });
            });
            habits.transaction((tx) => {
              tx.executeSql("DROP TABLE habits", null, null, (txObj, error) =>
                console.log(error)
              );
              tx.executeSql("DELETE FROM checkHabits", null, () => {
                alert("Deleted Database.", (txObj, error) =>
                  console.log(error)
                );
              });
            });
          }}
          style={styles.smallDownMargin}
        />
      </ScrollView>
    );
  }
}

export default Settings;
