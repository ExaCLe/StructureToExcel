import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("goals.db");
class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleFullfilled = () => {
    this.props.goal.progress++;
    this.setState({});
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE goals SET progress = ? WHERE id = ? ",
        [this.props.goal.progress, this.props.goal.id],
        () => {},
        () => {
          console.log("error");
        }
      );
    });
  };
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.habitContainer}
          onPress={() =>
            this.props.navigation.navigate("GoalsDetails", {
              ...this.props.goal,
            })
          }
        >
          <View style={styles.container2}>
            <View style={styles.containerHorizontal}>
              <Ionicons
                name={this.props.goal.icon}
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
                {this.props.goal.name}
              </Text>
            </View>
            <View style={styles.containerHorizontal}>
              <Text style={styles.primaryTextColor}>
                {this.props.goal.progress + " / " + this.props.goal.repetitions}
              </Text>
              <TouchableHighlight
                onPress={() => {
                  this.handleFullfilled();
                }}
                underlayColor="transparent"
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={colors.PrimaryTextColor}
                  style={styles.padding}
                />
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Goal;
