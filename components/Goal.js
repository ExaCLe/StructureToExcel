import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

const Goal = (props) => {
  return (
    <View>
      <TouchableHighlight
        style={styles.habitContainer}
        onPress={() =>
          props.navigation.navigate("GoalsDetails", { ...props.goal })
        }
      >
        <View style={styles.container2}>
          <View style={styles.containerHorizontal}>
            <Ionicons
              name={props.goal.icon}
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
              {props.goal.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Goal;
