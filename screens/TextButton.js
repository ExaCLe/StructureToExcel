import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const TextButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.margin, styles.padding, props.style]}
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
