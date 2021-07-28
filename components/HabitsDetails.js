import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
} from "react-native";
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
                this.props.navigation.goBack();
              }}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={colors.PrimaryTextColor}
                style={styles.padding}
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
            <Ionicons
              name="pencil"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonTopBar}
            underlayColor="#ffffff"
            onPress={() => {
              Alert.alert(
                "Delete Habit",
                "Möchtest du die Gewohnheit wirklich löschen? Das ist ein unwiderruflicher Vorgang.",
                [
                  { text: "Nein" },
                  {
                    text: "Ja",
                    onPress: () => {
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
                    },
                  },
                ]
              );
            }}
          >
            <Ionicons
              name="trash"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableHighlight>
        </View>
      ),
    });
  }

  // changes the state of the queue boolean in the db to the given value
  changeQueueState = (value) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE habits SET queue=? WHERE id=?",
        [value, this.props.route.params.id],
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
  calculateDate = (index) => {
    const time = this.state.now - 1000 * 86400 * index;
    const date = new Date(time);
    return date.getDate() + "." + date.getMonth();
  };
  render() {
    const changeQueueState = this.changeQueueState;
    return (
      <ScrollView style={styles.margin}>
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
        <Text style={styles.secondaryText}>Letzten 7 Tage:</Text>
        <View style={styles.containerHorizontal}>
          {this.state.lastSevenDays &&
            this.state.lastSevenDays.map((bool, index) => {
              const name = bool ? "checkmark-circle" : "close-circle";
              const color = bool
                ? colors.PrimaryAccentColor
                : colors.SecondaryTextColor;
              return (
                <View key={index + 1000}>
                  <Ionicons name={name} size={25} color={color} />
                  <Text style={[styles.secondaryText, styles.textVerySmall]}>
                    {this.calculateDate(index)}
                  </Text>
                </View>
              );
            })}
        </View>
        <Text style={styles.secondaryText}>Letzten 30 Tage:</Text>
        <View
          style={[
            styles.containerHorizontal,
            { display: "flex", flexWrap: "wrap" },
          ]}
        >
          {this.state.lastThirtyDays &&
            this.state.lastThirtyDays.map((bool, index) => {
              const name = bool ? "checkmark-circle" : "close-circle";
              const color = bool
                ? colors.PrimaryAccentColor
                : colors.SecondaryTextColor;
              return (
                <View key={index + 1000}>
                  <Ionicons name={name} size={25} color={color} />
                  <Text style={[styles.secondaryText, styles.textVerySmall]}>
                    {this.calculateDate(index)}
                  </Text>
                </View>
              );
            })}
        </View>

        <Text style={styles.secondaryText}>Monatsstatistik:</Text>
        <TouchableHighlight
          style={[{ zIndex: -2, position: "relative" }, styles.buttonPrimary]}
          onPress={() => {
            this.props.route.params.queue
              ? changeQueueState(0)
              : changeQueueState(1);
          }}
        >
          <Text style={styles.primaryButtonText}>
            {this.props.route.params.queue ? "To Habits" : "To Queue"}
          </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

export default HabitsDetails;
