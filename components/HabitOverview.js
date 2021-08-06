import React from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
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
      habits: null,
    };
    // create a table for the habits if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE habits (id INTEGER PRIMARY KEY, name TEXT, priority INTEGER, intervall INTEGER, repetitions INTEGER, icon TEXT, queue BOOLEAN);",
        null,
        () => {},
        (txObj, error) => {}
      );
    });
    // create table for the habits fullfilling
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE checkHabits (id INTEGER PRIMARY KEY, habit_id INTEGER, date TEXT, FOREIGN KEY(habit_id) REFERENCES habits(id));"
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
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("ChangeHabit", {
                edit: false,
              })
            }
          >
            <Ionicons name="add" size={25} color={colors.PrimaryTextColor} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("HabitsQueue")}
          >
            <MaterialIcons
              name="queue"
              size={25}
              color={colors.PrimaryTextColor}
            />
          </TouchableHighlight>
        </View>
      ),
    });
  }

  // gets the data for the habits out of the database
  fetchData = () => {
    console.log("Fetching data...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits WHERE queue IS NULL OR queue = 0 ORDER BY priority",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ habits: _array }, this.calculateScore);
        },
        () => console.error("Fehler beim Lesen der Gewohnheiten. ")
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM checkHabits WHERE date = date('now');",
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
      const sql = `SELECT * FROM checkHabits WHERE habit_id = ? AND date > DATE('now', '-${length_intervall} day')`;
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
