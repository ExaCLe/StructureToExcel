import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HeaderIcon = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      {(props.type === undefined || props.type === "Ionicons") && (
        <Ionicons color={colors.PrimaryTextColor} size={25} name={props.name} />
      )}
      {props.type === "MaterialIcons" && (
        <MaterialIcons
          name={props.name}
          size={25}
          color={colors.PrimaryTextColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default HeaderIcon;
