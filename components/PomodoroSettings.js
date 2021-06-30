import React from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles.js";

const PomodoroSettings = () => {
  return (
    <View style={styles.margin}>
      <Text style={styles.secondaryText}>Arbeitsintervalllänge: </Text>
      <View style={styles.containerHorizontal}>
        <TextInput
          placeholder={"50"}
          style={[
            styles.normalText,
            styles.textInputLarge,
            styles.primaryAccentColor,
            styles.margin,
            styles.padding,
            styles.textCenter,
          ]}
        />
        <Text style={styles.secondaryText}>Minuten</Text>
      </View>

      <Text style={styles.secondaryText}>Pausenintervalllänge: </Text>
      <View style={styles.containerHorizontal}>
        <TextInput
          placeholder={"10"}
          style={[
            styles.normalText,
            styles.textInputLarge,
            styles.primaryAccentColor,
            styles.margin,
            styles.padding,
            styles.textCenter,
          ]}
        />
        <Text style={styles.secondaryText}>Minuten</Text>
      </View>
      <Text style={styles.secondaryText}>Lange Pause nach: </Text>
      <View style={styles.containerHorizontal}>
        <TextInput
          placeholder={"99"}
          style={[
            styles.normalText,
            styles.textInputLarge,
            styles.primaryAccentColor,
            styles.margin,
            styles.padding,
            styles.textCenter,
          ]}
        />
        <Text style={styles.secondaryText}>Intervallen</Text>
      </View>
    </View>
  );
};

export default PomodoroSettings;
