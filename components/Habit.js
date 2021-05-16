import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Divider from "./Divider.js";

const Habit = (props) => {
  const handleFullfilled = props.handleFullfilled;
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>{props.habit.name}</Text>
        <View style={styles.container}>
          {props.habit.fullfilled ? (
            <Ionicons name="checkmark-circle-outline" size={25} color="#000" />
          ) : (
            <View style={styles.container}>
              <Ionicons name="close-circle-outline" size={25} color="#000" />
              <TouchableHighlight
                onPress={() => handleFullfilled(props.habit)}
                style={styles.button}
                underlayColor="#ffffff"
              >
                <Text style={[styles.text, styles.blue]}>Erledigt</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
      <Divider></Divider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#aaaaaa",
    marginRight: 5,
    borderRadius: 10,
  },
  blue: {
    color: "blue",
  },
});
export default Habit;

/*
header: {
    paddingTop: 10,
    fontSize: 30,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  button: {
    alignSelf: "flex-end",
    marginLeft: "50%",
  },
  text: {
    fontSize: 30,
    marginTop: 10,
    color: "blue",
  },
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  */
