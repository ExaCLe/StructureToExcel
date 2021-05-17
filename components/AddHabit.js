import React from "react";
import { Button, View, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";

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
        <TextInput
          placeholder="Name"
          onChangeText={this.handleNameChange}
          value={this.state.name}
        />
        <Button
          onPress={() => addHabit({ name: this.state.name })}
          title="Hinzufügen"
        />
      </View>
    );
  }
}

export default AddHabit;
