import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import { toTime } from "../helpers/Time.js";

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
            <View>
              <Text style={[styles.normalText, styles.primaryTextColor]}>
                Dauer: {toTime(this.props.tracking.duration_s)}
              </Text>
              <Text>Start: {this.props.tracking.start_time}</Text>
              <Text>Ende: {this.props.tracking.end_time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AktivityListObject;
