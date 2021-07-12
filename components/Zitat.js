import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import styles from "./styles.js";

const selectImages = (name) => {
  if (name === "Harvey Specter") return require("../assets/HarveySpecter.jpg");
  else if (name === "Jessica Pearson")
    return require("../assets/JessicaPearson.jpeg");
};

const Zitat = (props) => {
  const selectImage = selectImages;
  return (
    <View style={[styles.flexContainer]}>
      <Image
        style={[styles.image, styles.marginBottom]}
        source={selectImage(props.from)}
      />
      <View>
        <Text style={styles.quote}>"{props.quote}"</Text>
        <Text style={styles.quoteAppend}>Zitat von: {props.from}</Text>
      </View>
    </View>
  );
};

export default Zitat;
