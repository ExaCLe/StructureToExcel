import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";

import Habit from "./Habit.js";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
const db = SQLite.openDatabase("habits.db");

export default class HabitOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
    };
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE habits (id INTEGER PRIMARY KEY, name TEXT, priority INTEGER, intervall INTEGER, repetitions INTEGER, icon TEXT, queue BOOLEAN, object_id TEXT, deleted BOOLEAN, updatedAt DATETIME, version INTEGER NOT NULL DEFAULT 0);",
        null,
        () => {},
        (txObj, error) => {
          // console.log(error);
        }
      );
    });
    // create table for the habits fullfilling
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE checkHabits (id INTEGER PRIMARY KEY, habit_id INTEGER, date TEXT, object_id_check TEXT, habit_object_id TEXT, deleted BOOLEAN, updatedAt DATETIME, version INTEGER DEFAULT 0, FOREIGN KEY(habit_id) REFERENCES habits(id), FOREIGN KEY(habit_object_id) REFERENCES habits(object_id));"
      );
    });

    // get the habits from the database
    this.fetchData();
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        this.fetchData();
      }
    );
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <TouchableOpacity
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("Help", { screen: "habits" })
            }
          >
            <Ionicons name="help" size={25} color={colors.PrimaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("ChangeHabit", {
                edit: false,
              })
            }
          >
            <Ionicons name="add" size={25} color={colors.PrimaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("HabitsQueue")}
          >
            <MaterialIcons
              name="queue"
              size={25}
              color={colors.PrimaryTextColor}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }

  // gets the data for the habits out of the database
  fetchData = () => {
    console.log("Fetching data...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits WHERE (queue IS NULL OR queue = 0) AND (deleted = 0 OR deleted IS NULL) ORDER BY priority",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ habits: _array }, this.calculateScore);
        },
        (txObj, error) =>
          console.error("Fehler beim Lesen der Gewohnheiten. ", error)
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM checkHabits WHERE date = date('now') AND (deleted = 0 OR deleted IS NULL);",
        null,
        (txObj, results) => {
          this.addChecksToState(results);
        }
      );
    });
  };
  calculateScore = () => {
    if (!this.state.habits) return;
    for (let i = 0; i < this.state.habits.length; i++) {
      const expected = 30;
      const length_intervall =
        Math.round(30 / this.state.habits[i].repetitions) *
        this.state.habits[i].intervall;
      const sql = `SELECT * FROM checkHabits WHERE habit_id = ? AND date > DATE('now', '-${length_intervall} day') AND (deleted = 0 OR deleted IS NULL)`;
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [this.state.habits[i].id],
          (txObj, { rows: { _array } }) => {
            if (_array.length == 0) {
              this.setState((prevState) => {
                prevState.habits[i].score = 0;
                return { habits: prevState.habits };
              });
            } else {
              const value = _array.length - expected / 2;
              const score = 1 / (1 + Math.exp(-value * 0.2));
              this.setState((prevState) => {
                prevState.habits[i].score = score;
                return { habits: prevState.habits };
              });
            }
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    }
    this.calculateStreaks();
  };
  calculateStreaks = () => {
    for (let i = 0; i < this.state.habits.length; i++) {
      const habit = this.state.habits[i];
      // get all the entrys from the db
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM checkHabits WHERE habit_id = ? AND (deleted = 0 OR deleted IS NULL) ORDER BY date DESC",
          [habit.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              this.setState((prevState) => {
                prevState.habits[i].streak = 0;
                return prevState;
              });
              return;
            }
            let valid = true;
            let count = 0;
            let index = 0;
            let fullfilled = 0;
            let date = new Date();
            let current_date = new Date(_array[0].date);
            date.setHours(current_date.getHours());
            date.setMinutes(current_date.getMinutes());
            date.setSeconds(current_date.getSeconds());
            date.setMilliseconds(current_date.getMilliseconds());
            // as long as the streak is not broken continue
            while (valid) {
              // search for enough checks in the last period
              for (let j = 0; j < habit.intervall; j++) {
                const days_since_date =
                  (date - current_date) / 1000 / 3600 / 24;
                if (days_since_date <= habit.intervall) fullfilled++;
                else if (fullfilled < habit.repetitions) {
                  valid = false;
                  break;
                } else {
                  break;
                }
                if (_array.length <= ++index) {
                  valid = false;
                  break;
                }
                current_date = new Date(_array[index].date);
              }
              count += fullfilled;
              fullfilled = 0;
              date = new Date(date - 1000 * 3600 * 24 * habit.intervall);
            }
            this.setState((prevState) => {
              prevState.habits[i].streak = count;
              return prevState;
            });
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    }
  };
  // expects to get only the checked Habits for today
  addChecksToState = ({ rows: { _array } }) => {
    let newState = this.state;
    for (let i = 0; i < _array.length; i++) {
      // get the index of the habit in the state
      const index = this.state.habits.findIndex(
        (ele) => ele.id === _array[i].habit_id
      );
      if (index != -1 && newState.habits[index]) {
        newState.habits[index].fullfilled = true;
      }
    }
    this.setState({ ...newState });
  };

  handleFullfilled = (habit) => {
    const index = this.state.habits.findIndex((ele) => ele === habit);
    const id = this.state.habits[index].id;
    // insert the entry into check habits
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO checkHabits (habit_id, date) VALUES (?, date('now'))",
        [id]
      );
    });
    this.fetchData();
  };

  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <Habit
        habit={obj.item}
        handleFullfilled={this.handleFullfilled}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    return (
      <View style={[styles.margin, styles.flex, { flex: 1 }]}>
        {this.state.habits.length === 0 && (
          <View
            style={[
              styles.containerHorizontal,
              styles.margin,
              styles.padding,
              { flexWrap: "wrap" },
            ]}
          >
            <Text style={styles.secondaryText}>Füge über </Text>
            <Ionicons
              name={"add"}
              size={30}
              color={colors.SecondaryTextColor}
            />
            <Text style={styles.secondaryText}>neue Gewohnheiten ein.</Text>
            <Text style={styles.secondaryText}>Hilfe kannst du über </Text>
            <Ionicons
              name={"help"}
              size={30}
              color={colors.SecondaryTextColor}
            />
            <Text style={styles.secondaryText}>erhalten</Text>
          </View>
        )}
        <FlatList
          data={this.state.habits}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)}
          style={styles.flex}
        />
      </View>
    );
  }
}
