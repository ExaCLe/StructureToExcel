import React, { useEffect } from "react";
import { Text, View, Alert, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import { DAY, WEEK, MONTH } from "./OverviewGoals.js";

const db = SQLite.openDatabase("goals.db");

class GoalsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        this.render();
      }
    );
    // add the button to the top
    this.props.navigation.setOptions({
      title: this.props.route.params.name + " Details",
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
              this.props.navigation.navigate("ChangeGoal", {
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
                  "DELETE FROM goals WHERE id=?",
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
  archiveGoal = (bool) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE goals SET archive = ? WHERE id = ?",
        [bool, this.props.route.params.id],
        () => {
          this.props.navigation.goBack();
        }
      );
    });
  };

  render() {
    return (
      <View style={styles.margin}>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Name: </Text>
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.props.route.params.name}
          </Text>
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Priorität: </Text>
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.props.route.params.priority}
          </Text>
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Interval: </Text>
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.props.route.params.intervall === DAY
              ? "day"
              : this.props.route.params.intervall === MONTH
              ? "month"
              : "week"}
          </Text>
        </View>
        <TouchableHighlight
          style={[styles.buttonPrimary, { zIndex: -3 }]}
          onPress={() => {
            if (!this.props.route.params.archive)
              Alert.alert(
                "Archive Goal",
                "Möchtest du das Ziel wirklich archivieren? Dann ist es nur noch über das Archiv einsehbar.",
                [
                  { text: "Nein" },
                  {
                    text: "Ja",
                    onPress: () => {
                      this.archiveGoal(true);
                    },
                  },
                ]
              );
            else
              Alert.alert(
                "Revive Goal",
                "Möchtest du das Ziel wirklich wieder aktivieren? ",
                [
                  { text: "Nein" },
                  {
                    text: "Ja",
                    onPress: () => {
                      this.archiveGoal(false);
                    },
                  },
                ]
              );
          }}
        >
          <Text style={styles.primaryButtonText}>
            {this.props.route.params.archive ? "Reanimieren" : "Archivieren"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default GoalsDetails;
