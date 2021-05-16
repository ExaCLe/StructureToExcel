import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Divider from "./Divider";

const selectImages = (name) => {
  if (name === "Harvey Specter") return require("../assets/HarveySpecter.jpg");
  else if (name === "Jessica Pearson")
    return require("../assets/JessicaPearson.jpeg");
};

const Zitat = (props) => {
  const selectImage = selectImages;
  return (
    <View style={styles.flex}>
      <Image style={styles.image} source={selectImage(props.from)} />
      <View style={styles.container}>
        <Text style={styles.quote}>"{props.quote}"</Text>
        <Text style={styles.quoteAppend}>Zitat von: {props.from}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quote: {
    fontSize: 20,
  },
  quoteAppend: {
    fontSize: 10,
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: "75%",
    resizeMode: "contain",
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

export default Zitat;
