import React from "react";
import { TextInput } from "react-native";
import styles from "./styles";

const Textfield = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      style={[
        styles.normalText,
        styles.textInput,
        {
          borderColor: global.color,
          color: global.color,
          width: props.width,
          textAlign: props.textAlign,
        },

        styles.padding,
      ]}
      onChangeText={props.onChangeText}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export default Textfield;
