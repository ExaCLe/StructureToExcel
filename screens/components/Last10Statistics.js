import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import { toTime } from "../../helpers/Time";

const Last10Statistics = (props) => {
  return (
    <View
      style={{
        display: "flex",
        alignSelf: "center",
      }}
    >
      {props.lastTen.map((ele, index) => {
        return (
          <View key={index} style={[styles.containerHorizontal, {}]}>
            <Text
              style={[
                styles.primaryAccentColor,
                styles.normalText,
                { width: 50 },
              ]}
            >
              {index + 1}:
            </Text>
            <Text style={[styles.primaryAccentColor, styles.normalText]}>
              {toTime(ele)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Last10Statistics;
