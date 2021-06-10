import React from "react";
import { Button, View, TextInput, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";

// open the database for adding the habits
const db = SQLite.openDatabase("habits.db");

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      addHabit: props.route.params.addHabit,
    };
  }

  // adds a new habit to the state
  addHabit = (habit) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO habits (name) VALUES (?)",
        [this.state.name],
        () => {
          this.props.navigation.goBack();
        },
        null
      );
    });
  };

  // handles the name change in input
  handleNameChange = (text) => {
    this.setState({ name: text });
  };

  render() {
    const addHabit = this.addHabit;
    return (
      <View>
        <Text>Name:</Text>
        <TextInput
          placeholder="Name"
          onChangeText={this.handleNameChange}
          value={this.state.name}
        />
        <Text>Icon: </Text>
        <Button title={"Wähle Icon"} />
        <Text>Wie oft möchtest du sie erfüllen? </Text>
        <TextInput value={"1"} />
        <Text>Mal pro</Text>
        <TextInput value={"Tag"} />
        <Text>Priorität</Text>
        <TextInput value={"Priorität 1"} />
        <Button
          onPress={() => addHabit({ name: this.state.name })}
          title="Speichern"
        />
        <Button title={"Zur Warteschlange"} />
      </View>
    );
  }
}

export default AddHabit;
