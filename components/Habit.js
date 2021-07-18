import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

import Divider from "./Divider.js";

const Habit = (props) => {
  const handleFullfilled = props.handleFullfilled;
  return (
    <View>
      <TouchableHighlight
        style={styles.habitContainer}
        onPress={() => {
          props.navigation.navigate("HabitDetails", {
            ...props.habit,
            queue: props.queue,
          });
        }}
      >
        <View style={styles.container2}>
          <View style={styles.containerHorizontal}>
            <Ionicons
              name={props.habit.icon}
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
            <Text
              style={[
                styles.normalText,
                styles.primaryTextColor,
                styles.padding,
              ]}
            >
              {props.habit.name}
            </Text>
          </View>

          {!props.queue && (
            <View style={styles.containerHorizontal}>
              {props.habit.fullfilled ? (
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={colors.PrimaryTextColor}
                  style={styles.padding}
                />
              ) : (
                <TouchableHighlight
                  onPress={() => handleFullfilled(props.habit)}
                  underlayColor="transparent"
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={25}
                    color={colors.PrimaryTextColor}
                    style={styles.padding}
                  />
                </TouchableHighlight>
              )}
            </View>
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

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
