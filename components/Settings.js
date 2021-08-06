import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import AktivityTracker from "./AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./App.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "ffffff" };
    this.loadData();
  }
  handleInputChange = (input) => {
    if (input.length <= 6) {
      let good = true;
      for (let i = 0; i < input.length; i++) {
        const letter = input[i];
        if (
          !(
            +letter ||
            letter === "0" ||
            letter === "a" ||
            letter === "A" ||
            letter === "b" ||
            letter === "B" ||
            letter === "c" ||
            letter === "C" ||
            letter === "D" ||
            letter === "d" ||
            letter === "e" ||
            letter === "E" ||
            letter === "F" ||
            letter === "f"
          )
        )
          good = false;
      }
      if (good) {
        this.setState({ color: input });
      }
    }
  };
  loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("color");
      console.log(value);
      if (value !== null) {
        this.setState({ color: value });
        global.color = "#" + value;
      }
    } catch (e) {}
  };
  save = async () => {
    try {
      await AsyncStorage.setItem("color", this.state.color);
      global.color = "#" + this.state.color;
      alert("Gespeichert. Bitte App neu starten.");
    } catch (e) {}
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={[
            styles.normalText,
            styles.padding,
            styles.margin,
            styles.textInputLarge,
            styles.primaryAccentColor,
          ]}
          placeholder="Color"
          onChangeText={this.handleInputChange}
          value={this.state.color}
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            this.save();
          }}
          style={[styles.buttonPrimary]}
        >
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Settings;
