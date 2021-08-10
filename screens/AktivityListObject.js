import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import { toTime, extractTime } from "../helpers/Time.js";

class AktivityListObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={[styles.habitContainer, { backgroundColor: global.color }]}
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
            <View style={styles.margin}>
              <TimeStats
                time={toTime(this.props.tracking.duration_s)}
                label="Dauer:   "
              />
              <TimeStats
                time={extractTime(this.props.tracking.start_time)}
                label="Start: "
              />

              <TimeStats
                time={extractTime(this.props.tracking.end_time)}
                label="Ende: "
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const TimeStats = (props) => {
  return (
    <View style={styles.statsContainer}>
      <Text style={[styles.statsText, styles.primaryTextColor]}>
        {props.label}
      </Text>
      <Text style={[styles.statsText, styles.primaryTextColor]}>
        {props.time}
      </Text>
    </View>
  );
};

export default AktivityListObject;
