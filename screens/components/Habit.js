import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles.js";
import * as colors from "../../assets/colors.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Divider from "./Divider.js";

const Habit = (props) => {
  const handleFullfilled = props.handleFullfilled;
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.habitContainer,
          {
            backgroundColor:
              colors.SecondaryPriorityColors[props.habit.priority - 1],
          },
        ]}
        onPress={() => {
          props.navigation.navigate("HabitDetails", {
            ...props.habit,
            queue: props.queue,
          });
        }}
      >
        <View>
          <View
            style={{
              zIndex: -1,
              position: "relative",
              backgroundColor: colors.PriorityColors[props.habit.priority - 1],
              height: 75,
              borderRadius: 10,
              width: (() => {
                if (props.habit.score) return props.habit.score * 100 + "%";
                else return "0%";
              })(),
            }}
          ></View>
          <View
            style={[
              styles.container2,
              {
                zIndex: 1,
                position: "absolute",
                top: 7,
                width: "100%",
              },
            ]}
          >
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
                <Text
                  style={[
                    styles.normalText,
                    styles.primaryTextColor,
                    styles.padding,
                  ]}
                >
                  {props.habit.streak}
                </Text>
                <FontAwesome5
                  name="fire"
                  color={colors.PrimaryTextColor}
                  size={25}
                />
                {props.habit.fullfilled ? (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={25}
                    color={colors.PrimaryTextColor}
                    style={styles.padding}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => handleFullfilled(props.habit)}
                    underlayColor="transparent"
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={25}
                      color={colors.PrimaryTextColor}
                      style={styles.padding}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
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
