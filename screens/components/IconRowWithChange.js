import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextButton from "./TextButton";

const IconRowWithChange = (props) => {
  return (
    <View style={[styles.containerHorizontal, styles.topDownMargin]}>
      <Text style={[styles.secondaryText, styles.columnSize]}>Icon: </Text>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={styles.containerHorizontal}
      >
        <Ionicons name={props.icon} size={25} color={global.color} />
        <TextButton
          text="Wähle Icon"
          onPress={() => {
            props.onPress();
          }}
          style={styles.margin}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconRowWithChange;
