import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";

const BackButton = (props) => {
  return (
    <View style={styles.padding}>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}
      >
        <Ionicons
          name="arrow-back"
          size={25}
          style={styles.padding}
          color={colors.PrimaryTextColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
