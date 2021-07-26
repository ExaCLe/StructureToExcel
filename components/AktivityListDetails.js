import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

const db = SQLite.openDatabase("aktivitys.db");

class AktivityListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // add the button to the top
    this.props.navigation.setOptions({
      title: "Tracking Details",
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
                style={styles.padding}
              />
            </TouchableHighlight>
          </View>
        );
      },
      headerRight: () => (
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.buttonTopBar}
            onPress={() => {
              this.props.navigation.navigate("ChangeTracking", {
                ...this.props.route.params,
                edit: true,
              });
            }}
          >
            <Ionicons
              name="pencil"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonTopBar}
            underlayColor="#ffffff"
            onPress={() => {
              db.transaction((tx) => {
                tx.executeSql(
                  "DELETE FROM trackings WHERE id=?",
                  [this.props.route.params.id],
                  () => {
                    this.props.navigation.goBack();
                  },
                  (txObj, error) => {
                    console.log(error);
                  }
                );
              });
            }}
          >
            <Ionicons
              name="trash"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  toTime = (time) => {
    if (!time && time !== 0) return "";
    return (
      Math.floor(time / 3600) +
      " h " +
      Math.floor((time % 3600) / 60) +
      " min " +
      Math.round(time % 60) +
      " s"
    );
  };
  render() {
    return (
      <View style={styles.margin}>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Activity: </Text>
          <Ionicons
            name={this.props.route.params.icon}
            size={25}
            color={colors.PrimaryAccentColor}
          />
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.props.route.params.name}
          </Text>
        </View>
        <Text style={[styles.normalText, styles.primaryAccentColor]}>
          Dauer: {this.toTime(this.props.route.params.duration_s)}
        </Text>
        <Text>Start: {this.props.route.params.start_time}</Text>
        <Text>Ende: {this.props.route.params.end_time}</Text>
      </View>
    );
  }
}

export default AktivityListDetails;
