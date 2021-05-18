import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";

import Habit from "./Habit.js";
import Divider from "./Divider.js";

const db = SQLite.openDatabase("habits.db");

export default class HabitOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: null,
    };
    // create a table if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE habits (id INTEGER PRIMARY KEY, name TEXT, fullfilledToday INTEGER);"
      );
    });

    // get the habits from the database
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", (payload) => {
      this.forceUpdate();
    });
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          underlayColor="#ffffff"
          onPress={() =>
            this.props.navigation.navigate("AddHabit", {
              addHabit: this.addHabit,
            })
          }
        >
          <Ionicons name="add" size={25} />
        </TouchableHighlight>
      ),
    });
  }

  // compares two arrays for equality
  compareArrays(first, snd) {
    if (!first && !snd) return true;
    if (!first) return false;
    if (!snd) return false;
    // check for same length
    if (first.length != snd.length) return false;
    // iterate over the array and compare the objects
    for (let i = 0; i < first.length; i++) {
      if (typeof first[i] === "object") {
        if (!this.compareObjects(first[i], snd[i])) return false;
      } else if (!(first[i] === snd[i])) {
        return false;
      }
    }

    // if reached here arrays are equal
    return true;
  }

  // compares two objects for equality
  compareObjects(first, snd) {
    console.log("ddd");
    if (!first && !snd) return true;
    if (!first) return false;
    if (!snd) return false;
    // get the keys out of the objects
    const keys = Object.keys(first);
    // make sure the keys are equal
    if (!this.compareArrays(keys, Object.keys(snd))) return false;

    // iterate over the keys
    for (let i = 0; i < keys.length; i++) {
      if (typeof first[keys[i]] === "object") {
        if (!this.compareArrays(first[keys[i]], snd[keys[i]])) return false;
      } else if (!(first[keys[i]] === snd[keys[i]])) return false;
    }

    return true;
  }

  // gets the data for the habits out of the database
  fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits;",
        null,
        (txObj, { rows: { _array } }) => {
          console.log("Array: ", _array);
          console.log("State: ", this.state.habits);
          if (!this.compareArrays(this.state.habits, _array))
            this.setState({ habits: _array });
        },
        () => console.error("Fehler beim Lesen der Gewohnheiten. ")
      );
    });
  };

  handleFullfilled = (habit) => {
    const index = this.state.habits.findIndex((ele) => ele === habit);
    console.log(this.state.habits[index]);
    this.setState((prevState) => {
      prevState.habits[index].fullfilled = true;
      return { habits: [...prevState.habits] };
    });
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
      <View style={[styles.margin, styles.flex]}>
        <Divider></Divider>
        <FlatList
          data={this.state.habits}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

/* Reseting the db for testing: 

db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM habits",
        null,
        () => {
          console.log("Deleted");
        },
        (txObj, error) => {
          console.log("Fehler: ");
          console.log(error);
        }
      );
    });


// Insert some data: 
// insert some data for testing
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO habits (name) VALUES (?);",
        ["Lesen"],
        (txObj, resultSet) => {
          console.log("Success");
        },
        (txObj, err) => {
          console.err(err);
        }
      );
    });

    */
