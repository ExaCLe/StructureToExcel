import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import BackButton from "./BackButton.js";
import TextfieldAndLabel from "./TextfieldAndLabel.js";
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
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        );
      },
    });
  }

  // writes the changes into the db if legit
  componentDidUpdate() {
    if (
      parseInt(this.state.workingInterval) > 0 &&
      parseInt(this.state.breakInterval) > 0 &&
      parseInt(this.state.longBreakAfter) >= 0
    ) {
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
  }
  render() {
    return (
      <View style={styles.margin}>
        <TextfieldAndLabel
          label="Arbeitsintervalllänge in Minuten: "
          onChangeText={(text) => {
            if (+text || text === "" || text === "0" || text === "0.")
              this.setState({ workingInterval: text });
          }}
          keyboardType="numeric"
          value={"" + this.state.workingInterval}
          width="30%"
          textAlign="center"
          labelWidth="30%"
        />
        <TextfieldAndLabel
          value={this.state.breakInterval + ""}
          onChangeText={(text) => {
            if (+text || text === "") this.setState({ breakInterval: text });
          }}
          keyboardType="numeric"
          width="30%"
          textAlign="center"
          label="Pausenintervalllänge in Minuten: "
          labelWidth="30%"
        />
        <TextfieldAndLabel
          keyboardType="numeric"
          width="30%"
          textAlign="center"
          label="Lange Pause nach (Intervallen): "
          value={this.state.longBreakAfter + ""}
          onChangeText={(text) => {
            if (+text || text === "") this.setState({ longBreakAfter: text });
          }}
          labelWidth="30%"
        />
      </View>
    );
  }
}

export default PomodoroSettings;
