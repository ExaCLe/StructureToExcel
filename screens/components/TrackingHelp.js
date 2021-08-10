import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../../assets/colors.js";

const TrackingHelp = (props) => {
  return (
    <View
      style={[
        styles.containerHorizontal,
        styles.margin,
        styles.padding,
        { flexWrap: "wrap" },
      ]}
    >
      <Text style={styles.secondaryText}>Füge über </Text>
      <Ionicons name={"add"} size={30} color={colors.SecondaryTextColor} />
      <Text style={styles.secondaryText}>neue Trackings ein.</Text>
      <Text style={styles.secondaryText}>Hilfe kannst du über </Text>
      <Ionicons name={"help"} size={30} color={colors.SecondaryTextColor} />
      <Text style={styles.secondaryText}>erhalten</Text>
    </View>
  );
};

export default TrackingHelp;
