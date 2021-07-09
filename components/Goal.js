import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

const Goal = (props) => {
  return (
    <View>
      <TouchableHighlight style={styles.habitContainer}>
        <View style={styles.container2}>
          <View style={styles.containerHorizontal}>
            <Ionicons
              name="book"
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

          <View style={styles.containerHorizontal}>
            {props.goal.fullfilled ? (
              <Ionicons
                name="checkmark-circle-outline"
                size={25}
                color={colors.PrimaryTextColor}
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
                />
              </TouchableHighlight>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Goal;
