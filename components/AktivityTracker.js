import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";

class AktivityTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      running: false,
    };
  }
  startTimer = () => {
    this._timer = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time + 1 }));
    }, 1000);
    this.setState({ running: true });
  };
  stopTimer = () => {
    clearInterval(this._timer);
    this.setState({ running: false });
  };
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
            {/* This is the START button when not running*/}
            {!this.state.running && (
              <TouchableHighlight
                style={[styles.margin]}
                onPress={() => {
                  this.startTimer();
                }}
              >
                <Text style={[styles.normalText, styles.primaryTextColor]}>
                  Start
                </Text>
              </TouchableHighlight>
            )}
            {/* This is the END button when not running and the time*/}
            {this.state.running && (
              <View style={styles.containerHorizontal}>
                <Text style={[styles.normalText, styles.primaryTextColor]}>
                  {Math.floor(this.state.time / 60) +
                    ":" +
                    (this.state.time % 60 < 10
                      ? "0" + (this.state.time % 60)
                      : this.state.time % 60)}
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    this.stopTimer();
                  }}
                >
                  <Ionicons
                    name="stop"
                    size={25}
                    color={colors.PrimaryTextColor}
                  />
                </TouchableHighlight>
              </View>
            )}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AktivityTracker;
