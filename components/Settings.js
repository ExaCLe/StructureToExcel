import React from "react";
import { Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import AktivityTracker from "./AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import PrimaryButton from "./PrimaryButton.js";
import Test from "./Test.js";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "ffffff" };
    this.loadData();
  }
  handleInputChange = (input) => {
    if (input.length <= 7) {
      let good = true;
      for (let i = 1; i < input.length; i++) {
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
      }
    } catch (e) {}
  };
  save = async () => {
    try {
      if (
        !(this.state.color.length === 4 || this.state.color.length === 7) &&
        !this.state.color[0] === "#"
      ) {
        alert(
          "Ungülite Eingabe. Bitte in der Form #xxx oder #xxxxxx eingeben."
        );
        return;
      }
      await AsyncStorage.setItem("color", this.state.color);
      alert("Gespeichert. Bitte App neu starten.");
    } catch (e) {}
  };
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          style={[
            styles.normalText,
            styles.padding,
            styles.margin,
            styles.textInputLarge,
            { borderColor: global.color, color: global.color },
          ]}
          placeholder="#"
          onChangeText={this.handleInputChange}
          value={this.state.color}
        ></TextInput>
        <ColorPicker
          color={this.state.color}
          onColorChange={(color) => {
            this.setState({ color: fromHsv(color) });
          }}
          style={{ height: 500 }}
        />
        <PrimaryButton onPress={this.save} text={"Speichern"} />
      </ScrollView>
    );
  }
}

export default Settings;
