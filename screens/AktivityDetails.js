import React from "react";
import { Text, View, TouchableOpacity, Alert, Modal } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import BackButton from "./components/BackButton.js";
import TextButton from "./components/TextButton.js";
import PopUp from "./components/PopUp.js";
import HeaderIcon from "./components/HeaderIcon.js";
import { toTime } from "../helpers/Time.js";
import Last5Statistics from "./components/Last5Statistics.js";
import InformationRow from "./components/InformationRow.js";
import LoadingScreen from "./components/LoadingScreen.js";

const db = SQLite.openDatabase("aktivitys.db");
const SHOWING = "showing";
const CLOSE = "close";

class AktivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      showModalToday: false,
      today: null,
      lastMonth: null,
      lastWeek: null,
      lastFive: new Array(5),
      state: CLOSE,
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
          this.setState({ today: sum }, () => {
            this.checkLoaded();
          });
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
          this.setState({ lastWeek: sum }, () => {
            this.checkLoaded();
          });
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

          this.setState({ lastMonth: sum }, () => {
            this.checkLoaded();
          });
        }
      );
    });
  };
  checkLoaded = () => {
    if (
      this.state.lastMonth !== null &&
      this.state.lastWeek !== null &&
      this.state.today !== null &&
      !this.state.loaded
    )
      this.setState({ loaded: true });
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
              this.props.navigation.navigate("ChangeAktivity", {
                ...this.props.route.params,
                edit: true,
                targetAktivity: "AktivityDetails",
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
                () => {},
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
                  this.props.navigation.navigate("TrackingOverview");
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
  calculateTimes = (period) => {
    this.setState({ state: SHOWING });
    if (period === "today") {
      this.setState((prevState) => {
        prevState.lastFive[0] = prevState.today;
        prevState.title = "Letzten 5 Tage";
        return prevState;
      });
    } else if (period === "week") {
      this.setState((prevState) => {
        prevState.lastFive[0] = prevState.lastWeek;
        prevState.title = "Letzten 5 Wochen";
        return prevState;
      });
    } else if (period === "month") {
      this.setState((prevState) => {
        prevState.lastFive[0] = prevState.lastMonth;
        prevState.title = "Letzten 5 Monate";
        return prevState;
      });
    }
    for (let i = 1; i < 5; i++) {
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
              prevState.lastFive[i] = sum;
              return prevState;
            });
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.loaded) return false;
    if (nextState.showModalToday) return true;
    if (nextState.state === SHOWING) {
      let bool = true;
      for (let i = 0; i < 5; i++) {
        if (nextState.lastFive[i] === undefined) bool = false;
      }
      if (bool) {
        this.setState({ showModalToday: true });
        return true;
      }
      return false;
    }
    return true;
  }
  render() {
    if (!this.state.loaded) return <LoadingScreen />;
    console.log(this.state.state);
    return (
      <View style={styles.mainContainer}>
        <PopUp
          visible={this.state.showModalToday}
          close={() =>
            this.setState({
              showModalToday: false,
              state: CLOSE,
              lastFive: new Array(5),
            })
          }
        >
          <Last5Statistics
            lastFive={this.state.lastFive}
            title={this.state.title}
          />
        </PopUp>
        <InformationRow label="Name: " content={this.props.route.params.name} />
        <InformationRow label="Heute: " content={toTime(this.state.today)} />
        <InformationRow
          label="Diese Woche: "
          content={toTime(this.state.lastWeek)}
        />
        <InformationRow
          label="Dieser Monat: "
          content={toTime(this.state.lastMonth)}
        />
        <View>
          <TextButton
            text="Letzte 5 Tage"
            onPress={() => {
              this.calculateTimes("today");
            }}
          />

          <TextButton
            text="Letzte 5 Wochen"
            onPress={() => {
              this.calculateTimes("week");
            }}
          />

          <TextButton
            text="Letzte 5 Monate"
            onPress={() => {
              this.calculateTimes("month");
            }}
          />
        </View>
      </View>
    );
  }
}

export default AktivityDetails;
