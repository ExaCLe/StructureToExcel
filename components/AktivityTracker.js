import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";

class AktivityTracker extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.margin,
          styles.containerHorizontal,

          styles.habitContainer,
          styles.flexContainer,
          styles.spaceBetween,
        ]}
      >
        <TouchableHighlight style={[styles.margin]}>
          <View style={styles.containerHorizontal}>
            <Ionicons
              name="book"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
            <Text style={[styles.normalText, styles.primaryTextColor]}>
              Lesen
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.margin]}>
          <Text style={[styles.normalText, styles.primaryTextColor]}>
            Start
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AktivityTracker;
