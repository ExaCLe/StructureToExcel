import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#000000",
  },
});

export default Divider;
