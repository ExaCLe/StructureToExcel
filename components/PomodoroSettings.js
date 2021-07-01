import React from "react";
import { Text, View, TextInput, TouchableHighlight } from "react-native";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import Ionicons from "react-native-vector-icons/Ionicons";

class PomodoroSettings extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={styles.margin}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={colors.PrimaryTextColor}
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
  }
  render() {
    return (
      <View style={styles.margin}>
        <Text style={styles.secondaryText}>Arbeitsintervalllänge: </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            placeholder={"50"}
            style={[
              styles.normalText,
              styles.textInputLarge,
              styles.primaryAccentColor,
              styles.margin,
              styles.padding,
              styles.textCenter,
            ]}
          />
          <Text style={styles.secondaryText}>Minuten</Text>
        </View>

        <Text style={styles.secondaryText}>Pausenintervalllänge: </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            placeholder={"10"}
            style={[
              styles.normalText,
              styles.textInputLarge,
              styles.primaryAccentColor,
              styles.margin,
              styles.padding,
              styles.textCenter,
            ]}
          />
          <Text style={styles.secondaryText}>Minuten</Text>
        </View>
        <Text style={styles.secondaryText}>Lange Pause nach: </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            placeholder={"99"}
            style={[
              styles.normalText,
              styles.textInputLarge,
              styles.primaryAccentColor,
              styles.margin,
              styles.padding,
              styles.textCenter,
            ]}
          />
          <Text style={styles.secondaryText}>Intervallen</Text>
        </View>
      </View>
    );
  }
}

export default PomodoroSettings;
