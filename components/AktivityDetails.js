import React from "react";
import { Text, View, TouchableHighlight, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";

const db = SQLite.openDatabase("aktivitys.db");

class AktivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadTime();
  }
  // loads the tracked time out of the db
  loadTime = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM trackings WHERE act_id = ?",
        [this.props.route.params.id],
        (txObj, { rows: { _array } }) => {
          let twentyfourHours = 0,
            lastSeven = 0,
            lastThirty = 0,
            today = 0;
          const now = new Date();
          const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          _array.map((entry) => {
            const end = new Date(entry.end_time);
            const start = new Date(entry.start_time);
            if (end - todayStart >= 0) {
              if (start - todayStart >= 0) {
                today += entry.duration_s;
              } else {
                today += (end - todayStart) / 1000;
              }
            }
            if ((now - end) / 1000 / 3600 <= 24) {
              if ((now - start) / 1000 / 3600 <= 24)
                twentyfourHours += entry.duration_s;
              else twentyfourHours += 24 * 3600 - (now - end) / 1000;
            }
            if ((now - end) / 1000 / 3600 / 24 < 7) {
              if ((now - start) / 1000 / 3600 / 24 <= 7)
                lastSeven += entry.duration_s;
              else lastSeven += 24 * 3600 * 7 - (now - end) / 1000;
            }
            if ((now - end) / 1000 / 3600 / 24 < 30) {
              if ((now - start) / 1000 / 3600 / 24 <= 30)
                lastThirty += entry.duration_s;
              else lastThirty += 24 * 3600 * 7 - (now - end) / 1000;
            }
          });
          this.setState({
            today: today,
            twentyfourHours: twentyfourHours,
            lastSeven: lastSeven,
            lastThirty: lastThirty,
          });
        },
        (txObj, error) =>
          console.error("Fehler beim Lesen der Zeiten. " + error)
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
              this.props.navigation.navigate("ChangeAktivity", {
                ...this.props.route.params,
                edit: true,
                target: "AktivityDetails",
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
              Alert.alert(
                "Delete Aktivity",
                "Möchtest du diese Aktivität wirklich archivieren? Das ist ein unwiderruflicher Vorgang.",
                [
                  { text: "Nein" },
                  {
                    text: "Ja",
                    onPress: () => {
                      db.transaction((tx) => {
                        tx.executeSql(
                          "DELETE FROM activities WHERE id=?",
                          [this.props.route.params.id],
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
      (time % 60) +
      " s"
    );
  };
  render() {
    console.log("render");
    return (
      <View style={styles.margin}>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText]}>Name: </Text>
          <Text style={[styles.accentColorText, styles.textBig, styles.margin]}>
            {this.props.route.params.name}
          </Text>
        </View>
        <View>
          <Text>Heute: {this.toTime(this.state.today)}</Text>
          <Text>
            Letzten 24 Stunden: {this.toTime(this.state.twentyfourHours)}
          </Text>
          <Text>Letzten 7 Tage: {this.toTime(this.state.lastSeven)}</Text>
          <Text>Letzten 30 Tage: {this.toTime(this.state.lastThirty)}</Text>
        </View>
      </View>
    );
  }
}

export default AktivityDetails;
