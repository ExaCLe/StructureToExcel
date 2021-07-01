import React from "react";
import { Text, View, TouchableHighlight, Button } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
class PomodoroTimer extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Pomodoro Timer",
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("PomodoroSettings")}
          >
            <Ionicons
              name="settings"
              size={25}
              color={colors.PrimaryTextColor}
            />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  render() {
    return (
      <View style={[styles.margin, styles.flexContainer]}>
        <Text
          style={[styles.veryBigText, styles.accentColorText, styles.center]}
        >
          50:00
        </Text>
        <TouchableHighlight style={styles.buttonPrimary}>
          <Text style={styles.primaryButtonText}>Starten</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonPrimary}>
          <Text style={styles.primaryButtonText}>Reset</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.center}>
          <Text style={styles.textButton}>Zu Pausenintervall wechseln</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default PomodoroTimer;
