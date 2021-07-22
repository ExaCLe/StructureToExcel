import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

class AktivityListObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toTime = (time) => {
    if (!time && time !== 0) return "";
    return (
      Math.floor(time / 3600) +
      " h " +
      Math.floor((time % 3600) / 60) +
      " min " +
      (time % 60) +
      " s"
    );
  };
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.habitContainer}
          onPress={() =>
            this.props.navigation.navigate("AktivityListDetails", {
              ...this.props.tracking,
            })
          }
        >
          <View style={styles.container2}>
            <View style={styles.containerHorizontal}>
              <Ionicons
                name={this.props.tracking.icon}
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
                {this.props.tracking.name}
              </Text>
            </View>
            <View>
              <Text style={[styles.normalText, styles.primaryTextColor]}>
                Dauer: {this.toTime(this.props.tracking.duration_s)}
              </Text>
              <Text>Start: {this.props.tracking.start_time}</Text>
              <Text>Ende: {this.props.tracking.end_time}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AktivityListObject;
