import React from "react";
import { Text, View, Button, TextInput } from "react-native";
import styles from "./styles.js";
class AddAktivity extends React.Component {
  render() {
    return (
      <View>
        <Text>Name: </Text>
        <TextInput placeholder="Name" />
        <Text>Icon: </Text>
        <Button title={"Wähle Icon"} />
        <Button title={"Speichern"} />
      </View>
    );
  }
}

export default AddAktivity;
