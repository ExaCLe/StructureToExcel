import React from "react";
import { View } from "react-native";
import styles from "./styles.js";
import * as SQLite from "expo-sqlite";
import BackButton from "./components/BackButton.js";
import TextfieldAndLabel from "./components/TextfieldAndLabel.js";

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
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT workingInterval, breakInterval FROM pomodoroSettings ORDER BY id LIMIT 1",
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
      <View style={styles.mainContainer}>
        <TextfieldAndLabel
          label="Intervall in min: "
          onChangeText={(text) => {
            if (+text || text === "" || text === "0")
              this.setState({ workingInterval: text });
          }}
          keyboardType="numeric"
          value={"" + this.state.workingInterval}
          width="70%"
          textAlign="center"
          labelWidth="30%"
          style={styles.topDownMargin}
        />
        <TextfieldAndLabel
          value={this.state.breakInterval + ""}
          onChangeText={(text) => {
            if (+text || text === "") this.setState({ breakInterval: text });
          }}
          keyboardType="numeric"
          width="70%"
          textAlign="center"
          label="Pause in min: "
          labelWidth="30%"
          style={styles.topDownMargin}
        />
      </View>
    );
  }
}

export default PomodoroSettings;
