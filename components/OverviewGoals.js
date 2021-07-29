import React from "react";
import { Text, View, Button, TouchableHighlight, FlatList } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import Goal from "./Goal.js";
import * as SQLite from "expo-sqlite";
import { DAY, WEEK, MONTH } from "./../assets/intervals.js";
const db = SQLite.openDatabase("goals.db");
const tracking = SQLite.openDatabase("aktivitys.db");

class OverviewGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goals: [], period: DAY };
    // create a table for the habits if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY, name TEXT, priority INTEGER, intervall INTEGER, repetitions INTEGER, icon TEXT, progress INT, time BOOLEAN);",
        null,
        // success
        () => {
          console.log("success");
        },
        // error
        (txObj, error) => {}
      );
    });
    db.transaction((tx) => {
      tx.executeSql("ALTER TABLE goals ADD archive BOOLEAN", null, () =>
        console.log("success2")
      );
    });
    db.transaction((tx) => {
      tx.executeSql("ALTER TABLE goals ADD act_id INTEGER", null, () =>
        console.log("success2")
      );
    });
    // get the goals from the database
    this.fetchData();
  }
  // gets the data for the goals out of the database
  fetchData = () => {
    console.log("Fetching data for goals...");
    const sql =
      !this.props.route.params || !this.props.route.params.archive
        ? "SELECT * FROM goals WHERE intervall = ? AND (archive = 0 OR archive is NULL)"
        : "SELECT * FROM goals WHERE intervall = ? AND archive = 1";
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [this.state.period],
        async (txObj, { rows: { _array } }) => {
          _array.map((ele, index) => {
            if (ele.time)
              tracking.transaction((tt) => {
                tt.executeSql(
                  "SELECT * FROM trackings WHERE act_id = ?",
                  [ele.act_id],
                  (txObj, { rows: { _array } }) => {
                    let time = 0;
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
                          time += entry.duration_s;
                        } else {
                          time += (end - todayStart) / 1000;
                        }
                      }
                    });
                    this.setState((prev) => {
                      prev.goals[index].progress = time;
                      return { goals: prev.goals };
                    });
                  }
                );
              });
          });
          this.setState({ goals: _array });
        },
        (txObj, error) => console.error("Fehler beim Lesen der Ziele. ", error)
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
        this.fetchData();
      }
    );
    this.props.navigation.setOptions({
      title: (() => {
        const prefix =
          !this.props.route.params || !this.props.route.params.archive
            ? "Zielübersicht"
            : "Archiv";
        if (this.state.period === DAY) return prefix + " Tag";
        else if (this.state.period === WEEK) return prefix + " Woche";
        else return prefix + " Monat";
      })(),
      headerLeft: () => {
        if (!this.props.route.params || !this.props.route.params.archive)
          return null;
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
        <View style={styles.container}>
          {(!this.props.route.params || !this.props.route.params.archive) && (
            <TouchableHighlight
              underlayColor="#ffffff"
              onPress={() =>
                this.props.navigation.push("OverviewGoals", { archive: true })
              }
            >
              <Ionicons
                name="archive"
                size={25}
                color={colors.PrimaryTextColor}
                style={styles.padding}
              />
            </TouchableHighlight>
          )}

          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("ChangeGoal", {
                edit: false,
              })
            }
          >
            <Ionicons
              name="add"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({
      title: (() => {
        if (this.state.period === DAY) return "Zielübersicht Tag";
        else if (this.state.period === WEEK) return "Zielübersicht Woche";
        else return "Zielübersicht Monat";
      })(),
    });
  }
  // changes the view to DAY, WEEK or MONTH given by the argument
  changeView = (view) => {
    this.setState({ period: view });
  };
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return <Goal goal={obj.item} navigation={this.props.navigation} />;
  };
  render() {
    const changeView = this.changeView;
    return (
      <View>
        <View style={[styles.margin, styles.flex]}>
          <FlatList
            data={this.state.goals}
            renderItem={this.renderItem}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() => {
            if (this.state.period === DAY) changeView(WEEK);
            else changeView(DAY);
            this.fetchData();
          }}
        >
          <Text style={styles.primaryButtonText}>
            {this.state.period === DAY ? "Wochenübersicht" : "Tagesübersicht"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() => {
            if (this.state.period === MONTH) changeView(WEEK);
            else changeView(MONTH);
            this.fetchData();
          }}
        >
          <Text style={styles.primaryButtonText}>
            {this.state.period === MONTH
              ? "Wochenübersicht"
              : "Monatsübersicht"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default OverviewGoals;
