import React from "react";
import { View, Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import BackButton from "./components/BackButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
import { extractTimeDetailed, toTime } from "../helpers/Time.js";
import InformationRow from "./components/InformationRow.js";

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
              this.props.navigation.navigate("ChangeTracking", {
                ...this.props.route.params,
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
      "Delete Tracking",
      "Möchtest du diese Aufzeichnung wirklich löschen? Das ist ein irreversibler Vorgang.",
      [
        { text: "Nein" },
        {
          text: "Ja",
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE trackings SET deleted=1, version=? WHERE id=?",
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <InformationRow
          label="Aktivity Name: "
          content={this.props.route.params.name}
        />
        <InformationRow
          label="Aktivity Icon: "
          icon={this.props.route.params.icon}
        />
        <InformationRow
          label="Dauer:"
          content={toTime(this.props.route.params.duration_s)}
        />
        <InformationRow
          label="Start"
          content={extractTimeDetailed(this.props.route.params.start_time)}
        />
        <InformationRow
          label="Ende"
          content={extractTimeDetailed(this.props.route.params.end_time)}
        />
      </View>
    );
  }
}

export default AktivityListDetails;
