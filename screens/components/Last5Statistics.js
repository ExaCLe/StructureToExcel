import React from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "../styles";
import { toTime } from "../../helpers/Time";
import * as colors from "../../assets/colors.js";
import AnimatedBar from "./AnimatedBar";

const Last5Statistics = (props) => {
  let max = props.lastFive[0];
  props.lastFive.map((ele) => {
    if (max < ele) max = ele;
  });
  return (
    <View>
      <Text style={[styles.h1, { textAlign: "center", color: global.color }]}>
        {props.title}
      </Text>
      <View
        style={{
          height: "90%",
          display: "flex",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        {props.lastFive.map((ele, index) => {
          return (
            <View
              key={index}
              style={[
                styles.margin,
                {
                  display: "flex",
                  justifyContent: "flex-end",
                },
              ]}
            >
              <AnimatedBar height={(ele / max) * 92} />
              <Text
                style={[
                  styles.primaryAccentColor,
                  styles.textVerySmall,
                  { color: global.color },
                ]}
              >
                {toTime(ele)}
              </Text>
              <Text
                style={[
                  styles.primaryAccentColor,
                  styles.textVerySmall,
                  { alignSelf: "center", color: global.color },
                ]}
              >
                {index + 1}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Last5Statistics;
