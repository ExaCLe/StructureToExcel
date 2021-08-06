import React from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./App.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
import Habit from "./Habit.js";
const db = SQLite.openDatabase("habits.db");

class HabitsQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: null,
    };
    this.fetchData();
  }
  // gets the data for the habits out of the database
  fetchData = () => {
    console.log("Fetching data for queue...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits WHERE queue = 1",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ habits: _array });
        },
        () => console.error("Fehler beim Lesen der Gewohnheiten. ")
      );
    });
  };
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
      title: "Warteschlange",
      headerLeft: () => {
        return (
          <View style={styles.margin}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("HabitOverview");
              }}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={colors.PrimaryTextColor}
                style={styles.padding}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => (
        <View style={styles.container}>
          <TouchableOpacity
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("ChangeHabit", {
                edit: false,
              })
            }
          >
            <Ionicons
              name="add"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }

  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <Habit habit={obj.item} queue={true} navigation={this.props.navigation} />
    );
  };

  render() {
    return (
      <View style={[styles.margin, styles.flex]}>
        <FlatList
          data={this.state.habits}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    );
  }
}

export default HabitsQueue;
