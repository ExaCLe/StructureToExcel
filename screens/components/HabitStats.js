import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles";
import * as colors from "../../assets/colors.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import { extractDateWithDayOfWeek } from "../../helpers/Time";
import LoadingScreen from "./LoadingScreen";

const calculateDate = (index, now) => {
  const time = now - 1000 * 86400 * index;
  return extractDateWithDayOfWeek(time);
};

const HabitStats = (props) => {
  return (
    <View style={[styles.alignItemsCenter]}>
      <View style={styles.containerHorizontalStats}>
        {!props.entrys && <LoadingScreen />}
        {props.entrys &&
          props.entrys.map((bool, index) => {
            const name = bool ? "checkmark-circle" : "close-circle";
            const color = bool ? global.color : colors.SecondaryTextColor;
            return (
              <View key={index + 1000} style={styles.habitStatEntry}>
                <TouchableOpacity
                  onLongPress={() => {
                    props.onLongPress(index, bool);
                  }}
                  onPress={() => {
                    props.onPress(index, bool);
                  }}
                >
                  <Ionicons name={name} size={50} color={color} />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.secondaryText,
                    styles.textVerySmall,
                    styles.textAlignCenter,
                  ]}
                >
                  {calculateDate(index, props.now)}
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default HabitStats;
