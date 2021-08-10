import React from "react";
import { StatusBar, Text, View } from "react-native";
import styles from "./../styles";
import * as colors from "./../../assets/colors.js";

const AppStatusBar = () => {
  return (
    <StatusBar
      barStyle={"light-content"}
      backgroundColor={colors.PrimaryAccentColor}
    />
  );
};

export default AppStatusBar;
