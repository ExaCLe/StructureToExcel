import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import BackButton from "./components/BackButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
import { toTime } from "../helpers/Time.js";
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
    console.log("Rendering");
    return (
      <View style={styles.margin}>
        <InformationRow
          label="Aktivity Name: "
          content={this.props.route.params.name}
        />
        <InformationRow
          label="Aktivity Icon: "
          icon={this.props.route.params.icon}
        />
        <Text style={[styles.normalText, { color: global.color }]}>
          Dauer: {toTime(this.props.route.params.duration_s)}
        </Text>
        <Text>Start: {this.props.route.params.start_time}</Text>
        <Text>Ende: {this.props.route.params.end_time}</Text>
      </View>
    );
  }
}

export default AktivityListDetails;
