import React from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import styles from "./styles.js";
class AddGoal extends React.Component {
  render() {
    return (
      <View>
        <Text>Name: </Text>
        <TextInput placeholder="Name" />
        <Text>Icon: </Text>
        <Button title={"Wähle Icon"} />
        <Text>Intervall: </Text>
        <TextInput placeholder="Woche" />
        <Text>Priorität: </Text>
        <TextInput placeholder="Priorität 1" />
        <TextInput placeholder="6" />
        <Text>von</Text>
        <TextInput placeholder="12" />
        <Button title={"Speichern"} />
      </View>
    );
  }
}

export default AddGoal;
