import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Button,
  Vibration,
} from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("pomodoro.db");

const WORK = "working";
const BREAK = "break";
const PAUSE = "pause";
const RUNNING = "running";

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: WORK,
      state: PAUSE,
      data_loaded: false,
    };
    // create the table for the settings and insert the standard information.
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE pomodoroSettings (id INTEGER PRIMARY KEY, workingInterval INT, breakInterval INT, longBreakAfter INT);",
        null,
        () => {
          // if successful (therfore first time creating the db, insert the data)
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO pomodoroSettings (id, workingInterval, breakInterval, longBreakAfter) VALUES (0, 50, 10, 99)"
            );
          });
        },
        (txObj, error) => {}
      );
    });
    // insert the settings from the db
    this.fetchData();
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  // fetches the settings from the db
  fetchData = () => {
    console.log("Fetching data for pomodoro...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pomodoroSettings ORDER BY id LIMIT 1",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({
            ..._array[0],
            time: _array[0].workingInterval * 60,
            data_loaded: true,
          });
        },
        () => console.error("Fehler beim Lesen der Settings. ")
      );
    });
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        this.fetchData();
      }
    );
    this.props.navigation.setOptions({
      title: "Pomodoro Timer",
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("PomodoroSettings")}
          >
            <Ionicons
              name="settings"
              size={25}
              color={colors.PrimaryTextColor}
            />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  resetAndChange = () => {
    if (this.state.interval === WORK)
      this.setState({
        time: this.state.breakInterval * 60,
        interval: BREAK,
      });
    else
      this.setState({
        time: this.state.workingInterval * 60,
        interval: WORK,
      });
  };
  render() {
    if (this.state.data_loaded) {
      return (
        <View style={[styles.margin, styles.flexContainer]}>
          <Text
            style={[styles.veryBigText, styles.accentColorText, styles.center]}
          >
            {Math.floor(this.state.time / 60) +
              ":" +
              (this.state.time % 60 < 10
                ? "0" + (this.state.time % 60)
                : this.state.time % 60)}
          </Text>
          <TouchableHighlight
            style={styles.buttonPrimary}
            onPress={() => {
              if (this.state.state === PAUSE) {
                this._timer = setInterval(() => {
                  if (this.state.time === 0) {
                    Vibration.vibrate(3000);
                    this.resetAndChange();
                  }
                  this.setState((prevState) => ({ time: prevState.time - 1 }));
                }, 1000);
                this.setState({ state: RUNNING });
              } else {
                clearInterval(this._timer);
                this.setState({ state: PAUSE });
              }
            }}
          >
            <Text style={styles.primaryButtonText}>
              {this.state.state === PAUSE ? "Starten" : "Pausieren"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonPrimary}
            onPress={() => {
              if (this.state.interval === WORK)
                this.setState({ time: this.state.workingInterval * 60 });
              else this.setState({ time: this.state.breakInterval * 60 });
            }}
          >
            <Text style={styles.primaryButtonText}>Reset</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.center}
            onPress={() => {
              this.resetAndChange();
            }}
          >
            <Text style={styles.textButton}>
              {this.state.interval === WORK
                ? "Zu Pausenintervall wechseln"
                : "Zu Arbeitsintervall wechseln"}
            </Text>
          </TouchableHighlight>
        </View>
      );
    } else return null;
  }
}

export default PomodoroTimer;
