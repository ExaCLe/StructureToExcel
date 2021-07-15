import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";

class AktivityTracker extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          style={[styles.margin, styles.habitContainer]}
          onPress={() => {
            this.props.navigation.navigate("ChangeAktivity", {
              ...this.props.activity,
              edit: true,
            });
          }}
        >
          <View style={styles.container2}>
            <View style={styles.containerHorizontal}>
              <Ionicons
                name="book"
                size={25}
                color={colors.PrimaryTextColor}
                style={styles.padding}
              />
              <Text style={[styles.normalText, styles.primaryTextColor]}>
                {this.props.activity.name}
              </Text>
            </View>
            <TouchableHighlight style={[styles.margin]}>
              <Text style={[styles.normalText, styles.primaryTextColor]}>
                Start
              </Text>
            </TouchableHighlight>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AktivityTracker;
