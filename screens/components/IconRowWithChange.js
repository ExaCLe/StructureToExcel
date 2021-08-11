import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextButton from "./TextButton";

const IconRowWithChange = (props) => {
  return (
    <View style={[styles.containerHorizontal]}>
      <Text style={[styles.secondaryText, styles.columnSize]}>Icon: </Text>
      <Ionicons name={props.icon} size={25} color={global.color} />
      <TextButton
        text="Wähle Icon"
        onPress={() => {
          props.onPress();
        }}
        style={styles.margin}
      />
    </View>
  );
};

export default IconRowWithChange;
