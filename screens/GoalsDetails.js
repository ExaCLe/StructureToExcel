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
import InformationRow from "./components/InformationRow.js";

const db = SQLite.openDatabase("goals.db");
const tracking = SQLite.openDatabase("aktivitys.db");

class GoalsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (props.route.params.time) this.fetchAktivity();
  }
  fetchAktivity = () => {
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
  componentDidMount() {
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
              this.confirmDelete();
            }}
          />
        </View>
      ),
    });
  }
  confirmDelete = () => {
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
  };
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
  handleArchive = () => {
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
  };
  intervall = ["Tag", "Woche", "Monat"];

  render() {
    return (
      <View style={styles.mainContainer}>
        <InformationRow content={this.props.route.params.name} label="Name:" />
        <InformationRow
          content={this.props.route.params.priority}
          label="Priorität:"
        />
        <InformationRow
          content={this.intervall[this.props.route.params.intervall - 1]}
          label="Intervall:"
        />
        <InformationRow
          content={
            this.props.route.params.time
              ? toTime(this.props.route.params.progress) +
                " / " +
                this.props.route.params.repetitions +
                " h"
              : this.props.route.params.progress +
                " von " +
                this.props.route.params.repetitions
          }
          label="Fortschritt:"
        />
        <PrimaryButton
          text={this.props.route.params.archive ? "Reanimieren" : "Archivieren"}
          onPress={() => {
            this.handleArchive();
          }}
          style={styles.topDownMargin}
        />
      </View>
    );
  }
}

export default GoalsDetails;
