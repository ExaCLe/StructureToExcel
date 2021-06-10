import React from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
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

const styles = StyleSheet.create({});

export default AddAktivity;
