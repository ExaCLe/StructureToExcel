import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../../assets/colors.js";

const InformationRow = (props) => {
  return (
    <View style={[styles.containerHorizontal, styles.topDownMargin]}>
      <Text style={[styles.secondaryText, styles.columnSize]}>
        {props.label}
      </Text>
      {!props.icon && (
        <Text style={[{ color: global.color }, styles.normalText]}>
          {props.content}
        </Text>
      )}
      {props.icon && (
        <Ionicons
          style={styles.margin}
          name={props.icon}
          color={colors.PrimaryAccentColor}
          size={35}
        />
      )}
    </View>
  );
};

export default InformationRow;
