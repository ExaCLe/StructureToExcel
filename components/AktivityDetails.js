import React from "react";
import { Text, View, TouchableOpacity, Alert, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import BackButton from "./BackButton.js";
import TextButton from "./TextButton.js";
import PopUp from "./PopUp.js";

const db = SQLite.openDatabase("aktivitys.db");

class AktivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      showModalToday: false,
      today: null,
      lastMonth: null,
      lastWeek: null,
      lastTen: new Array(10),
    };
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
        },
        (txObj, error) => {
          console.log(error);
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
      this.state.lastMonth !== null &&
      this.state.lastWeek !== null &&
      this.state.today !== null &&
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
  calculateTimes = (period) => {
    if (period === "today") {
      this.setState((prevState) => {
        prevState.lastTen[0] = prevState.today;
        return prevState;
      });
    } else if (period === "week") {
      this.setState((prevState) => {
        prevState.lastTen[0] = prevState.lastWeek;
        return prevState;
      });
    } else if (period === "month") {
      this.setState((prevState) => {
        prevState.lastTen[0] = prevState.lastMonth;
        return prevState;
      });
    }
    for (let i = 1; i < 10; i++) {
      let sql;
      if (period === "today") {
        sql = `SELECT * FROM trackings WHERE act_id = ? AND (deleted=0 OR deleted IS NULL) AND start_time > DATE('now', '-${i} day', 'start of day') AND start_time < DATE('now', '-${
          i - 1
        } day', 'start of day')`;
      } else if (period === "week") {
        sql = `SELECT * FROM trackings WHERE act_id = ? AND (deleted=0 OR deleted IS NULL) AND start_time > DATE('now', '-${
          (i + 1) * 7
        } days', 'weekday 1') AND start_time < DATE('now', '-${
          i * 7
        } day', 'weekday 1')`;
      } else if (period === "month") {
        sql = `SELECT * FROM trackings WHERE act_id = ? AND (deleted=0 OR deleted IS NULL) AND start_time > DATE('now', '-${i} month', 'start of month') AND start_time < DATE('now', '-${
          i - 1
        } month', 'start of month')`;
      }
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [this.props.route.params.id],
          (txObj, { rows: { _array } }) => {
            let sum = 0;
            _array.map((ele) => {
              sum += ele.duration_s;
            });
            this.setState((prevState) => {
              prevState.lastTen[i] = sum;
              return prevState;
            });
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    }
    this.setState({ showModalToday: true });
  };
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
        <PopUp
          visible={this.state.showModalToday}
          close={() => this.setState({ showModalToday: false })}
        >
          <View
            style={{
              display: "flex",
              alignSelf: "center",
            }}
          >
            {this.state.lastTen.map((ele, index) => {
              return (
                <View key={index} style={[styles.containerHorizontal, {}]}>
                  <Text
                    style={[
                      styles.primaryAccentColor,
                      styles.normalText,
                      { width: 50 },
                    ]}
                  >
                    {index + 1}:
                  </Text>
                  <Text style={[styles.primaryAccentColor, styles.normalText]}>
                    {this.toTime(ele)}
                  </Text>
                </View>
              );
            })}
          </View>
        </PopUp>
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
            <TextButton
              text="Letzte 10 Tage"
              onPress={() => {
                this.calculateTimes("today");
              }}
            />
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
            <TextButton
              text="Letzte 10 Wochen"
              onPress={() => {
                this.calculateTimes("week");
              }}
            />
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
            <TextButton
              text="Letzte 10 Monate"
              onPress={() => {
                this.calculateTimes("month");
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default AktivityDetails;
