import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("habits.db");

class EditHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.route.params,
    };
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
        <Button
          onPress={() => {
            // handle change in the database
            console.log(this.state.name);
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE habits SET name=? WHERE id=?",
                [this.state.name, this.state.id],
                (txObj, resultSet) => {
                  console.log(txObj, resultSet);
                  // navigate back
                  this.props.navigation.navigate("HabitDetails", {
                    ...this.state,
                  });
                },
                null
              );
            });
          }}
          title={"Bestätigen"}
        />
      </View>
    );
  }
}

export default EditHabit;
