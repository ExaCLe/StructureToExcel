import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";

const TextButton = (props) => {
  return (
    <TouchableOpacity
      style={[{ marginBottom: 10, marginTop: 10 }, props.style]}
      onPress={() => {
        props.onPress();
      }}
    >
      <Text style={[styles.textButton, { color: global.color }]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
