import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./App.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
import { toTime } from "./../helpers/Time.js";
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
  width = () => {
    let value;
    if (this.props.goal.time)
      value =
        (this.props.goal.progress / (this.props.goal.repetitions * 3600)) * 100;
    else value = (this.props.goal.progress / this.props.goal.repetitions) * 100;
    if (value >= 100) return "100%";
    else return value + "%";
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 75,
            marginBottom: 10,
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 10,
            backgroundColor:
              colors.SecondaryPriorityColors[this.props.goal.priority - 1],
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
          onPress={() =>
            this.props.navigation.navigate("GoalsDetails", {
              ...this.props.goal,
            })
          }
        >
          <View>
            <View
              style={{
                zIndex: -1,
                position: "relative",
                backgroundColor:
                  colors.PriorityColors[this.props.goal.priority - 1],
                height: 75,
                borderRadius: 10,
                width: (() => {
                  return this.width();
                })(),
              }}
            ></View>
            <View
              style={[
                styles.container2,
                {
                  zIndex: 1,
                  position: "absolute",
                  top: 7,
                  width: "100%",
                },
              ]}
            >
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

              {!this.props.goal.archive && (
                <View style={styles.containerHorizontal}>
                  <Text style={[styles.primaryTextColor, styles.padding]}>
                    {this.props.goal.time
                      ? toTime(this.props.goal.progress) +
                        " / " +
                        this.props.goal.repetitions +
                        " h"
                      : this.props.goal.progress +
                        " / " +
                        this.props.goal.repetitions}
                  </Text>

                  {!this.props.goal.time && (
                    <TouchableOpacity
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
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Goal;
