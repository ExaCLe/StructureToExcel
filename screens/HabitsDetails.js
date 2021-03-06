import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import PrimaryButton from "./components/PrimaryButton.js";
import BackButton from "./components/BackButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
import InformationRow from "./components/InformationRow.js";
import LoadingScreen from "./components/LoadingScreen.js";
import { extractDateWithDayOfWeek } from "./../helpers/Time.js";
import HabitStats from "./components/HabitStats.js";
import TextButton from "./components/TextButton.js";

const db = SQLite.openDatabase("habits.db");

class HabitsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      frequency: this.createFrequencyString(),
      dates: [],
    };
    this.fetchData();
  }

  fetchData = () => {
    this.calculateScore();
    // get the fullfilled dates out of the db
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM checkHabits WHERE habit_id = ? AND date >= date('now', '-30 days') AND (deleted = 0 OR deleted IS NULL)",
        [this.props.route.params.id],
        (txObj, { rows: { _array } }) => {
          let now = new Date();
          now.setHours(2);
          now.setMinutes(0);
          now.setSeconds(0);
          now.setMilliseconds(0);
          let lastSevenDays = [false, false, false, false, false, false, false];
          let lastThirtyDays = new Array(30);
          for (let i = 0; i < 30; i++) lastThirtyDays[i] = false;
          const new_array = _array.map((element) => {
            element.date = new Date(element.date);
            element.since = (now - element.date) / 1000 / 86400;
            if (element.since <= 6) lastSevenDays[element.since] = true;
            if (element.since <= 29) lastThirtyDays[element.since] = true;
            return element;
          });
          this.setState({
            dates: new_array,
            lastSevenDays: lastSevenDays,
            now: now,
            lastThirtyDays: lastThirtyDays,
          });
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };
  componentDidMount() {
    // add the button to the top
    this.props.navigation.setOptions({
      title: this.props.route.params.name + " Details",
      headerLeft: () => {
        return (
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        );
      },
      headerRight: () => (
        <View style={styles.row}>
          <HeaderIcon
            name="pencil"
            onPress={() => {
              this.props.navigation.navigate("ChangeHabit", {
                ...this.props.route.params,
                edit: true,
              });
            }}
          />
          <HeaderIcon
            name="trash"
            onPress={() => {
              this.confirmDelete();
            }}
          />
        </View>
      ),
    });
  }
  calculateScore = () => {
    const expected = 30;
    const length_intervall =
      Math.round(30 / this.props.route.params.repetitions) *
      this.props.route.params.intervall;
    const sql = `SELECT * FROM checkHabits WHERE habit_id = ? AND date > DATE('now', '-${length_intervall} day') AND (deleted = 0 OR deleted IS NULL)`;
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [this.props.route.params.id],
        (txObj, { rows: { _array } }) => {
          const length = _array.length;
          if (length == 0) {
            this.setState({
              scores: 0,
            });
          } else {
            const value = length - expected / 2;
            const score = 1 / (1 + Math.exp(-value * 0.2));
            this.setState({
              score: score,
            });
          }
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };
  confirmDelete = () => {
    Alert.alert(
      "Delete Habit",
      "M??chtest du die Gewohnheit wirklich l??schen? Das ist ein unwiderruflicher Vorgang.",
      [
        { text: "Nein" },
        {
          text: "Ja",
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE habits SET deleted = 1, version = ? WHERE id=?",
                [
                  this.props.route.params.version + 2,
                  this.props.route.params.id,
                ],
                () => {},
                null
              );
            });
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE checkHabits SET deleted = 1, version = 1 WHERE habit_id=?",
                [this.props.route.params.id],
                () => {
                  this.props.navigation.goBack();
                },
                (txObj, error) => {
                  console.log(error);
                }
              );
            });
          },
        },
      ]
    );
  };
  // changes the state of the queue boolean in the db to the given value
  changeQueueState = (value) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE habits SET queue=?, version=? WHERE id=?",
        [
          value,
          this.props.route.params.version + 1,
          this.props.route.params.id,
        ],
        (txObj, resultSet) => {
          if (!value) this.props.navigation.navigate("HabitOverview");
          else this.props.navigation.navigate("HabitsQueue");
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  createFrequencyString = () => {
    let interval = "Monat";
    const interval_number = this.props.route.params.intervall;
    if (interval_number === 1) interval = "Tag";
    else if (interval_number === 2) interval = "Woche";
    else if (interval_number === 3) inverval = "Monat";
    const result = this.props.route.params.repetitions + " Mal pro " + interval;
    return result;
  };

  addCheck = (index, bool) => {
    if (!bool) {
      const sql = `INSERT INTO checkHabits (habit_id, date) VALUES (?, date('now', '-${index} day'))`;
      console.log(sql);
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [this.props.route.params.id],
          (txObj, result) => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
      this.fetchData();
    } else {
      const sql = `UPDATE checkHabits SET deleted = 1, version=? WHERE habit_id = ? AND date = date('now', '-${index} day')`;
      console.log(sql);
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [this.props.route.params.version + 1, this.props.route.params.id],
          (txObj, result) => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
      this.fetchData();
    }
  };
  addCheckWithAlert = (index, bool) => {
    if (!bool) {
      this.confirmAdd(index, bool);
    } else {
      this.confirmDeleteEntry(index, bool);
    }
  };
  confirmDeleteEntry = (index, bool) => {
    Alert.alert(
      "L??schen",
      "M??chtest du wirklich den Eintrag der Gewohnheit l??schen?",
      [
        {
          text: "Ja",
          onPress: () => {
            this.addCheck(index, bool);
          },
        },
        {
          text: "Nein",
        },
      ]
    );
  };
  confirmAdd = (index, bool) => {
    Alert.alert(
      "Nachtragen",
      "M??chtest du wirklich die Gewohnheit nachtragen?",
      [
        {
          text: "Ja",
          onPress: () => {
            this.addCheck(index, bool);
          },
        },
        {
          text: "Nein",
        },
      ]
    );
  };
  render() {
    const changeQueueState = this.changeQueueState;
    return (
      <ScrollView style={styles.mainContainer}>
        <InformationRow content={this.props.route.params.name} label="Name:" />
        <InformationRow
          content={this.props.route.params.priority}
          label="Priorit??t:"
        />
        <InformationRow
          content={
            this.props.route.params.repetitions +
            " Mal in " +
            this.props.route.params.intervall +
            " Tagen"
          }
          label="H??ufigkeit"
        />
        <InformationRow
          content={Math.round(this.state.score * 100) + " %"}
          label="Score"
        />

        {/* 7 Tage Stats */}
        <Text style={[styles.secondaryText, styles.topDownMargin]}>
          Letzten 7 Tage:
        </Text>
        <HabitStats
          entrys={this.state.lastSevenDays}
          onLongPress={this.addCheck}
          onPress={this.addCheckWithAlert}
          now={this.state.now}
        />

        {/* 30 Tage Stats */}
        <Text style={[styles.secondaryText, styles.topDownMargin]}>
          Letzten 30 Tage:
        </Text>
        <HabitStats
          entrys={this.state.lastThirtyDays}
          onLongPress={this.addCheck}
          onPress={this.addCheckWithAlert}
          now={this.state.now}
        />

        <TextButton
          text={
            this.props.route.params.queue
              ? "Zu den Gewohnheiten"
              : "Zur Warteschlange"
          }
          onPress={() => {
            this.props.route.params.queue
              ? changeQueueState(0)
              : changeQueueState(1);
          }}
          style={[
            styles.extraMargin,
            styles.downMargin,
            { alignSelf: "center" },
          ]}
        />
      </ScrollView>
    );
  }
}

export default HabitsDetails;
