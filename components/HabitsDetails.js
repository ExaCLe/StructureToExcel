import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";

const db = SQLite.openDatabase("habits.db");

class HabitsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
    };
    // get the fullfilled dates out of the db
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM checkHabits WHERE habit_id = ? GROUP BY date",
        [this.props.route.params.id],
        (txObj, { rows: { _array } }) => {
          this.setState({ dates: _array });
        }
      );
    });
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({
      title: this.props.route.params.name + " Details",
    });
  }

  componentDidMount() {
    // add the button to the top
    this.props.navigation.setOptions({
      title: this.props.route.params.name,
      headerRight: () => (
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.buttonTopBar}
            onPress={() => {
              this.props.navigation.navigate(
                "EditHabit",
                this.props.route.params
              );
            }}
          >
            <Ionicons name="pencil" size={25} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonTopBar}
            underlayColor="#ffffff"
            onPress={() => {
              db.transaction((tx) => {
                tx.executeSql(
                  "DELETE FROM habits WHERE id=?",
                  [this.props.route.params.id],
                  () => {
                    this.props.navigation.goBack();
                  },
                  null
                );
              });
            }}
          >
            <Ionicons name="trash" size={25} />
          </TouchableHighlight>
        </View>
      ),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textSmall}>Name: </Text>
        <Text style={styles.textBig}>{this.props.route.params.name}</Text>
        <Text>Letzte Einträge:</Text>
        <Text style={styles.textSmall}>
          {this.state.dates.map((ele) => ele.date + "\n")}
        </Text>
        <Text>Monatsstatistik:</Text>
      </View>
    );
  }
}

export default HabitsDetails;
