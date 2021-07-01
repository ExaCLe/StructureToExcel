import React from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

class HabitsQueue extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Warteschlange",
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
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("AddHabit", {
                addHabit: this.addHabit,
              })
            }
          >
            <Ionicons name="add" size={25} color={colors.PrimaryTextColor} />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  render() {
    return <Text style={styles.normalText}>HabitsQueue</Text>;
  }
}

export default HabitsQueue;
