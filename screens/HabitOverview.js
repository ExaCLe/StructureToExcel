import React from "react";
import { View, FlatList, Text } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";

import Habit from "./components/Habit.js";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import HeaderIcon from "./components/HeaderIcon.js";
import AppStatusBar from "./components/StatusBar.js";
import LoadingScreen from "./components/LoadingScreen.js";
const db = SQLite.openDatabase("habits.db");

export default class HabitOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      scores: 0,
      streaks: 0,
      habits: [],
    };
    this.createDatabases();
  }
  createDatabases = () => {
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
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        if (this.state.loaded) {
          this.setState({ loaded: false, streaks: 0, scores: 0 });
          this.fetchData();
        }
      }
    );
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <HeaderIcon
            name="help"
            onPress={() =>
              this.props.navigation.navigate("Help", { screen: "habits" })
            }
          />
          <HeaderIcon
            onPress={() =>
              this.props.navigation.navigate("ChangeHabit", {
                edit: false,
              })
            }
            name="add"
          />
          <HeaderIcon
            name="time-outline"
            onPress={() => this.props.navigation.navigate("HabitsQueue")}
          />
        </View>
      ),
    });
  }

  // gets the data for the habits out of the database
  fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits WHERE (queue IS NULL OR queue = 0) AND (deleted = 0 OR deleted IS NULL) ORDER BY priority",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ habits: _array }, this.calculateScore);
        },
        (txObj, error) => this.createDatabases()
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
      const sql = `SELECT * FROM checkHabits WHERE habit_id = ? AND date > DATE('now', '-${length_intervall} day') AND (deleted = 0 OR deleted IS NULL) GROUP BY habit_id, date`;
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [this.state.habits[i].id],
          (txObj, { rows: { _array } }) => {
            if (_array.length == 0) {
              this.setState((prevState) => {
                prevState.habits[i].score = 0;
                return {
                  habits: prevState.habits,
                  scores: prevState.scores + 1,
                };
              });
            } else {
              const value = _array.length - expected / 2;
              const score = 1 / (1 + Math.exp(-value * 0.2));
              this.setState((prevState) => {
                prevState.habits[i].score = score;
                return {
                  habits: prevState.habits,
                  scores: prevState.scores + 1,
                };
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
          "SELECT * FROM checkHabits WHERE habit_id = ? AND (deleted = 0 OR deleted IS NULL) GROUP BY habit_id, date ORDER BY date DESC ",
          [habit.id],
          (txObj, { rows: { _array } }) => {
            if (_array.length === 0) {
              this.setState((prevState) => {
                prevState.habits[i].streak = 0;
                return { ...prevState, streaks: prevState.streaks + 1 };
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
              return { ...prevState, streaks: prevState.streaks + 1 };
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.loaded) return true;
    else if (
      nextState.streaks === nextState.habits.length &&
      nextState.scores === nextState.habits.length
    ) {
      this.setState({ loaded: true });
      return false;
    }
    return false;
  }

  render() {
    if (!this.state.loaded) return <LoadingScreen />;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar />
        {/* Help on empty screen */}
        {this.state.habits.length === 0 && (
          <View
            style={[
              styles.containerHorizontal,
              styles.margin,
              styles.padding,
              { flexWrap: "wrap" },
            ]}
          >
            <Text style={styles.secondaryText}>
              Füge über{" "}
              <Ionicons
                name={"add"}
                size={30}
                color={colors.SecondaryTextColor}
              />
              neue Gewohnheiten hinzu. Hilfe kannst du über
              <Ionicons
                name={"help"}
                size={30}
                color={colors.SecondaryTextColor}
              />
              erhalten
            </Text>
          </View>
        )}

        {/* Habits on not empty screen */}
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
