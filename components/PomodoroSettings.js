import React from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles.js";

const PomodoroSettings = () => {
  return (
    <View>
      <Text>Arbeitsintervalllänge: </Text>
      <TextInput placeholder={"50"} />
      <Text>Minuten</Text>
      <Text>Pausenintervalllänge: </Text>
      <TextInput placeholder={"10"} />
      <Text>Minuten</Text>
      <Text>Lange Pause nach: </Text>
      <TextInput placeholder={"99"} />
      <Text>Intervallen</Text>
    </View>
  );
};

export default PomodoroSettings;
