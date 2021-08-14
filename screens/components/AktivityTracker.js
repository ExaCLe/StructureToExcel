import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import * as colors from "../../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("aktivitys.db");

class AktivityTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      running: false,
    };
  }
  startTimer = () => {
    const now = new Date();
    this.setState({
      running: true,
      start_s: (() => {
        return Date.now();
      })(),
      start_time: (() => {
        return now.toISOString();
      })(),
    });
    this._timer = setInterval(() => {
      const now = Date.now();
      this.setState((prevState) => ({
        time: Math.floor((now - prevState.start_s) / 1000),
      }));
    }, 1000);
  };
  stopTimer = () => {
    clearInterval(this._timer);
    const now = new Date().toISOString();
    const duration = this.state.time;
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO trackings (act_id, start_time, end_time, duration_s) VALUES (?, ?, ?, ?);",
        [this.props.activity.id, this.state.start_time, now, duration],
        () => {
          console.log("Erfolgreich eingefügt.");
        },
        (txObj, err) => {
          console.log("Fehler beim Einfügen " + err);
        }
      );
    });
    this.setState({ running: false, time: 0 });
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.margin,
            styles.habitContainer,
            { backgroundColor: global.color },
          ]}
          onPress={() => {
            this.props.navigation.navigate("AktivityDetails", {
              ...this.props.activity,
              edit: true,
            });
          }}
        >
          <View style={styles.container2}>
            <View style={styles.containerHorizontal}>
              <Ionicons
                name={this.props.activity.icon}
                size={25}
                color={colors.PrimaryTextColor}
                style={styles.padding}
              />
              <Text style={[styles.normalText, styles.primaryTextColor]}>
                {this.props.activity.name}
              </Text>
            </View>
            {/* This is the START button when not running*/}
            {!this.state.running && (
              <TouchableOpacity
                style={[styles.margin]}
                onPress={() => {
                  this.startTimer();
                }}
              >
                {/* <Entypo name="controller-record" size={30} color={"red"} /> */}
                <View style={styles.recordButton}></View>
              </TouchableOpacity>
            )}
            {/* This is the END button when not running and the time*/}
            {this.state.running && (
              <View style={styles.containerHorizontal}>
                <Text style={[styles.normalText, styles.primaryTextColor]}>
                  {Math.floor(this.state.time / 60) +
                    ":" +
                    (this.state.time % 60 < 10
                      ? "0" + (this.state.time % 60)
                      : this.state.time % 60)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.stopTimer();
                  }}
                >
                  <Ionicons
                    name="stop"
                    size={25}
                    color={colors.PrimaryTextColor}
                    style={styles.padding}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AktivityTracker;
