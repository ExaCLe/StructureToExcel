import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

const InformationRow = (props) => {
  return (
    <View style={styles.containerHorizontal}>
      <Text style={[styles.secondaryText, styles.columnSize]}>
        {props.label}
      </Text>
      <Text style={[{ color: global.color }, styles.textBig, styles.margin]}>
        {props.content}
      </Text>
    </View>
  );
};

export default InformationRow;
