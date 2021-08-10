import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import BackButton from "./BackButton.js";

const db = SQLite.openDatabase("aktivitys.db");

class AktivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.loadTime();
  }
  // loads the tracked time out of the db
  loadTime = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM trackings WHERE act_id = ? AND (deleted=0 OR deleted IS NULL) AND start_time > DATE('now', 'start of day')",
        [this.props.route.params.id],
        (txObj, { rows: { _array } }) => {
          let sum = 0;
          _array.map((ele) => {
            sum += ele.duration_s;
          });
          this.setState({ today: sum });
        }
      );
      tx.executeSql(
        "SELECT * FROM trackings WHERE act_id = ? AND (deleted=0 OR deleted IS NULL) AND start_time > DATE('now', '-7 days', 'weekday 1')",
        [this.props.route.params.id],
        (txObj, { rows: { _array } }) => {
          let sum = 0;
          _array.map((ele) => {
            sum += ele.duration_s;
          });
          this.setState({ lastWeek: sum });
        }
      );
      tx.executeSql(
        "SELECT * FROM trackings WHERE act_id = ? AND (deleted=0 OR deleted IS NULL) AND start_time > DATE('now', 'start of month')",
        [this.props.route.params.id],
        (txObj, { rows: { _array } }) => {
          let sum = 0;
          _array.map((ele) => {
            sum += ele.duration_s;
          });
          this.setState({ lastMonth: sum });
        }
      );
    });
  };
  componentDidUpdate() {
    if (
      this.state.lastMonth &&
      this.state.lastWeek &&
      this.state.today &&
      !this.state.loaded
    )
      this.setState({ loaded: true });
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
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        );
      },
      headerRight: () => (
        <View style={styles.row}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
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
                          "UPDATE activities SET deleted=1, version=? WHERE id=?",
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
                        tx.executeSql(
                          "UPDATE trackings SET deleted=1, version=? WHERE act_id=?",
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
          >
            <Ionicons
              name="trash"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableOpacity>
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
    if (!this.state.loaded) return null;
    return (
      <View style={styles.margin}>
        <View style={styles.containerHorizontal}>
          <Text style={[styles.secondaryText, styles.columnSize]}>Name: </Text>
          <Text
            style={[{ color: global.color }, styles.textBig, styles.margin]}
          >
            {this.props.route.params.name}
          </Text>
        </View>
        <View>
          <View style={styles.containerHorizontal}>
            <Text style={[styles.secondaryText, styles.columnSize]}>
              Heute:
            </Text>
            <Text
              style={[{ color: global.color }, styles.textBig, styles.margin]}
            >
              {this.toTime(this.state.today)}
            </Text>
          </View>
          <View style={styles.containerHorizontal}>
            <Text style={[styles.secondaryText, styles.columnSize]}>
              Letzte Woche:
            </Text>
            <Text
              style={[{ color: global.color }, styles.textBig, styles.margin]}
            >
              {this.toTime(this.state.lastWeek)}
            </Text>
          </View>
          <View style={styles.containerHorizontal}>
            <Text style={[styles.secondaryText, styles.columnSize]}>
              Letzter Monat:
            </Text>
            <Text
              style={[{ color: global.color }, styles.textBig, styles.margin]}
            >
              {this.toTime(this.state.lastMonth)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AktivityDetails;
