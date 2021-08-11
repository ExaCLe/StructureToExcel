import React, { useEffect } from "react";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import { DAY, WEEK, MONTH } from "./OverviewGoals.js";
import { toTime } from "../helpers/Time.js";
import PrimaryButton from "./components/PrimaryButton.js";
import BackButton from "./components/BackButton.js";
import HeaderIcon from "./components/HeaderIcon.js";

const db = SQLite.openDatabase("goals.db");
const tracking = SQLite.openDatabase("aktivitys.db");

class GoalsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (props.route.params.time) this.fetchAktivity();
  }
  fetchAktivity = () => {
    console.log("Fetching");
    tracking.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities WHERE id = ? AND (deleted=0 OR deleted IS NULL)",
        [this.props.route.params.act_id],
        (txObj, { rows: { _array } }) => {
          console.log(_array);
          if (_array.length)
            this.setState({
              aktivity_name: _array[0].name,
              aktivity_icon: _array[0].icon,
            });
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };
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
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        );
      },
      headerRight: () => (
        <View style={styles.row}>
          <HeaderIcon
            name="pencil"
            onPress={() => {
              this.props.navigation.navigate("ChangeGoal", {
                ...this.props.route.params,
                ...this.state,
                edit: true,
              });
            }}
          />
          <HeaderIcon
            name="trash"
            onPress={() => {
              Alert.alert(
                "Delete Goal",
                "Möchtest du das Ziel wirklich löschen? Dieser Vorgang ist unwiederruflich.",
                [
                  { text: "Nein" },
                  {
                    text: "Ja",
                    onPress: () => {
                      db.transaction((tx) => {
                        tx.executeSql(
                          "UPDATE goals SET deleted=1, version=? WHERE id=?",
                          [
                            this.props.route.params.version + 1,
                            this.props.route.params.id,
                          ],
                          () => {
                            this.props.navigation.goBack();
                          },
                          (txObj, error) => {
                            console.log(error);
                          }
                        );
                      });
                    },
                  },
                ]
              );
            }}
          />
        </View>
      ),
    });
  }
  archiveGoal = (bool) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE goals SET archive = ?, version=? WHERE id = ?",
        [bool, this.props.route.params.version + 1, this.props.route.params.id],
        () => {
          this.props.navigation.goBack();
        }
      );
    });
  };

  render() {
    console.log(this.props.route.params);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText, styles.columnSize]}>Name: </Text>
          <Text
            style={[{ color: global.color }, styles.textBig, styles.margin]}
          >
            {this.props.route.params.name}
          </Text>
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText, styles.columnSize]}>
            Priorität:{" "}
          </Text>
          <Text
            style={[{ color: global.color }, styles.textBig, styles.margin]}
          >
            {this.props.route.params.priority}
          </Text>
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText, styles.columnSize]}>
            Interval:{" "}
          </Text>
          <Text
            style={[{ color: global.color }, styles.textBig, styles.margin]}
          >
            {this.props.route.params.intervall === DAY
              ? "Tag"
              : this.props.route.params.intervall === MONTH
              ? "Monat"
              : "Woche"}
          </Text>
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText, styles.columnSize]}>
            Fortschritt:{" "}
          </Text>
          <Text
            style={[{ color: global.color }, styles.textBig, styles.margin]}
          >
            {this.props.route.params.time
              ? toTime(this.props.route.params.progress) +
                " / " +
                this.props.route.params.repetitions +
                " h"
              : this.props.route.params.progress +
                " von " +
                this.props.route.params.repetitions}
          </Text>
        </View>
        <PrimaryButton
          text={this.props.route.params.archive ? "Reanimieren" : "Archivieren"}
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
        />
      </View>
    );
  }
}

export default GoalsDetails;
