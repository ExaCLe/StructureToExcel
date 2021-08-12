import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

const LoadingScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.normalText}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
