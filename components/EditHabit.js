import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";

const db = SQLite.openDatabase("habits.db");

class EditHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.route.params,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Edit " + this.props.route.params.name,
    });
  }

  // handle the name change in the input field
  handleChange = (text) => {
    this.setState({ name: text });
  };

  render() {
    return (
      <View>
        <Text>Name: </Text>
        <TextInput value={this.state.name} onChangeText={this.handleChange} />
        <Text>Icon: </Text>
        <Button title={"Wähle Icon"} />
        <Text>Wie öft möchtest du sie erfüllen?</Text>
        <TextInput value={"7"} />
        <Text>Mal pro</Text>
        <TextInput value={"Woche"} />
        <Text>Priorität</Text>
        <TextInput value={"Prioriät 1"} />
        <Button
          onPress={() => {
            // handle change in the database
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE habits SET name=? WHERE id=?",
                [this.state.name, this.state.id],
                (txObj, resultSet) => {
                  // navigate back
                  this.props.navigation.navigate("HabitDetails", {
                    ...this.state,
                  });
                },
                null
              );
            });
          }}
          title={"Speichern"}
        />
        <Button title={"Zur Warteschlange"} />
      </View>
    );
  }
}

export default EditHabit;
