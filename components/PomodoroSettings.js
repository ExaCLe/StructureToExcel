import React from "react";
import { Text, View, TextInput, TouchableHighlight } from "react-native";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("pomodoro.db");

class PomodoroSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workingInterval: 50,
      breakInterval: 10,
      id: 0,
      longBreakAfter: 99,
    };
    // insert the settings from the db into the state
    this.fetchData();
  }
  // fetches the settings from the db
  fetchData = async () => {
    console.log("Fetching data for pomodoro-settings...");
    let result;
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pomodoroSettings ORDER BY id LIMIT 1",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({
            ..._array[0],
          });
        },
        () => console.error("Fehler beim Lesen der Settings. ")
      );
    });
  };
  componentDidMount() {
    this.props.navigation.setOptions({
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
    });
  }

  // writes the changes into the db
  componentDidUpdate() {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE pomodoroSettings SET workingInterval=?, breakInterval=?, longBreakAfter=? WHERE id=?",
        [
          this.state.workingInterval,
          this.state.breakInterval,
          this.state.longBreakAfter,
          this.state.id,
        ],
        // success
        () => {},
        // error
        () => {}
      );
    });
  }
  render() {
    return (
      <View style={styles.margin}>
        <Text style={styles.secondaryText}>Arbeitsintervalllänge: </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            value={"" + this.state.workingInterval}
            style={[
              styles.normalText,
              styles.textInputLarge,
              styles.primaryAccentColor,
              styles.margin,
              styles.padding,
              styles.textCenter,
            ]}
            onChangeText={(text) => {
              if (+text || text === "" || text === "0" || text === "0.")
                this.setState({ workingInterval: text });
            }}
            keyboardType="numeric"
          />
          <Text style={styles.secondaryText}>Minuten</Text>
        </View>

        <Text style={styles.secondaryText}>Pausenintervalllänge: </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            value={this.state.breakInterval + ""}
            style={[
              styles.normalText,
              styles.textInputLarge,
              styles.primaryAccentColor,
              styles.margin,
              styles.padding,
              styles.textCenter,
            ]}
            onChangeText={(text) => {
              if (+text || text === "") this.setState({ breakInterval: text });
            }}
            keyboardType="numeric"
          />
          <Text style={styles.secondaryText}>Minuten</Text>
        </View>
        <Text style={styles.secondaryText}>Lange Pause nach: </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            value={this.state.longBreakAfter + ""}
            style={[
              styles.normalText,
              styles.textInputLarge,
              styles.primaryAccentColor,
              styles.margin,
              styles.padding,
              styles.textCenter,
            ]}
            onChangeText={(text) => {
              if (+text || text === "") this.setState({ longBreakAfter: text });
            }}
            keyboardType="numeric"
          />
          <Text style={styles.secondaryText}>Intervallen</Text>
        </View>
      </View>
    );
  }
}

export default PomodoroSettings;
