import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";

const SmallPrimaryButton = (props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={[styles.smallPrimaryButton, { backgroundColor: global.color }]}
      >
        <Ionicons name={props.icon} color={colors.PrimaryTextColor} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default SmallPrimaryButton;
