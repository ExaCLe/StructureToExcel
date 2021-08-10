import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import BackButton from "./BackButton.js";
import HeaderIcon from "./HeaderIcon.js";
import { toTime } from "../helpers/Time.js";

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
            }}
          />
        </View>
      ),
    });
  }
  render() {
    return (
      <View style={styles.margin}>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Activity: </Text>
          <Ionicons
            name={this.props.route.params.icon}
            size={25}
            color={global.color}
          />
          <Text
            style={[{ color: global.color }, styles.textBig, styles.margin]}
          >
            {this.props.route.params.name}
          </Text>
        </View>
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
