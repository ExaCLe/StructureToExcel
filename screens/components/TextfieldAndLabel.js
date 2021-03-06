import React from "react";
import { TextInput, View, Text } from "react-native";
import styles from "../styles";
import Textfield from "./Textfield";
import PropTypes from "prop-types";

const TextfieldAndLabel = (props) => {
  let labelWidth = {};
  if (props.labelWidth) labelWidth = { width: props.labelWidth };
  return (
    <View style={[styles.containerHorizontal, props.style]}>
      <Text style={[styles.secondaryText, styles.columnSize, labelWidth]}>
        {props.label}
      </Text>
      <View style={{ width: props.width }}>
        <Textfield
          secureTextEntry={props.secureTextEntry}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          width={"100%"}
          textAlign={props.textAlign}
        />
      </View>
    </View>
  );
};

TextfieldAndLabel.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
};

export default TextfieldAndLabel;
