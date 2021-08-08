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
  };

  saveHabits = async (_array, currentUser) => {
    for (let i = 0; i < _array.length; i++) {
      const habit = _array[i];
      let Habit = new Parse.Object("Habit");
      if (habit.object_id) {
        Habit.set("objectId", habit.object_id + "");
      }
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
        "SELECT * FROM checkHabits JOIN habits WHERE checkHabits.habit_id = habits.id",
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
      habits.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM habits WHERE object_id = ?",
          [habit.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              habits.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO habits (name, priority, intervall, repetitions, icon, queue, object_id) VALUES (?, ?, ?, ?, ?, ?, ?);",
                  [
                    habit.get("name"),
                    habit.get("priority"),
                    habit.get("intervall"),
                    habit.get("repetitions"),
                    habit.get("icon"),
                    habit.get("queue"),
                    habit.id,
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
              habits.transaction((tx) => {
                tx.executeSql(
                  "UPDATE habits SET name=?, intervall=?, priority=?, repetitions=?, icon=? WHERE object_id=?",
                  [
                    habit.get("name"),
                    habit.get("intervall"),
                    habit.get("priority"),
                    habit.get("repetitions"),
                    habit.get("icon"),
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
