import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles.js";

const PrimaryButton = (props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={[styles.buttonPrimary, { backgroundColor: global.color }]}
      >
        <Text style={styles.primaryButtonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;
