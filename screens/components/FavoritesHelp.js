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
      <Ionicons
        name={"heart-outline"}
        size={30}
        color={colors.SecondaryTextColor}
      />
      <Text style={styles.secondaryText}>
        neue Favoriten hinzu, wenn du in einer Kategorie bist.
      </Text>
      <Text style={styles.secondaryText}>
        Die gespeicherten Favoriten kannst du dann über{" "}
      </Text>
      <Ionicons name={"heart"} size={30} color={colors.SecondaryTextColor} />
      <Text style={styles.secondaryText}>
        im Hauptmenü der Zitate erreichen.
      </Text>
    </View>
  );
};

export default TrackingHelp;
