import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

const db = SQLite.openDatabase("habits.db");

class HabitsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: this.createFrequencyString(),
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

  componentDidMount() {
    // add the button to the top
    this.props.navigation.setOptions({
      title: this.props.route.params.name + " Details",
      headerLeft: () => {
        return (
          <View style={styles.margin}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate("HabitOverview", {
                  rerender: true,
                });
              }}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={colors.PrimaryTextColor}
              />
            </TouchableHighlight>
          </View>
        );
      },
      headerRight: () => (
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.buttonTopBar}
            onPress={() => {
              this.props.navigation.navigate("ChangeHabit", {
                ...this.props.route.params,
                edit: true,
              });
            }}
          >
            <Ionicons name="pencil" size={25} color={colors.PrimaryTextColor} />
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
            <Ionicons name="trash" size={25} color={colors.PrimaryTextColor} />
          </TouchableHighlight>
        </View>
      ),
    });
  }

  createFrequencyString = () => {
    let interval = "Monat";
    const interval_number = this.props.route.params.intervall;
    if (interval_number === 1) interval = "Tag";
    else if (interval_number === 2) interval = "Woche";
    else if (interval_number === 3) inverval = "Monat";
    const result = this.props.route.params.repetitions + " Mal pro " + interval;
    return result;
  };
  render() {
    return (
      <View style={styles.margin}>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Name: </Text>
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.props.route.params.name}
          </Text>
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Priorität: </Text>
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.props.route.params.priority}
          </Text>
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Häufigkeit: </Text>
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.state.frequency}
          </Text>
        </View>

        <Text style={styles.secondaryText}>Letzte Einträge:</Text>
        <Text style={[styles.accentColorText, styles.textSmall]}>
          {this.state.dates.map((ele) => ele.date + "\n")}
        </Text>
        <Text style={styles.secondaryText}>Monatsstatistik:</Text>
      </View>
    );
  }
}

export default HabitsDetails;
