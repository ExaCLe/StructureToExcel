import React from "react";
import { Text, View, FlatList } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import Goal from "./components/Goal.js";
import * as SQLite from "expo-sqlite";
import { DAY, WEEK, MONTH } from "../assets/intervals.js";
import BackButton from "./components/BackButton.js";
import SmallPrimaryButton from "./components/SmallPrimaryButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
import LoadingScreen from "./components/LoadingScreen.js";
const db = SQLite.openDatabase("goals.db");
const tracking = SQLite.openDatabase("aktivitys.db");
class OverviewGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goals: [], period: DAY, loaded: false, workedGoals: 0 };
    this.createDatabases();
  }
  createDatabases = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY, name TEXT, priority INTEGER, intervall INTEGER, repetitions INTEGER, icon TEXT, progress INT, time BOOLEAN, version INTEGER NOT NULL DEFAULT 0, object_id TEXT, deleted BOOLEAN DEFAULT 0, archive BOOLEAN, act_id INTEGER);",
        null,
        // success
        () => {},
        // error
        (txObj, error) => {
          console.log(error);
        }
      );
    });
    this.fetchData();
  };
  // gets the data for the goals out of the database
  fetchData = () => {
    const sql =
      !this.props.route.params || !this.props.route.params.archive
        ? "SELECT * FROM goals WHERE intervall = ? AND (archive = 0 OR archive is NULL) AND (deleted=0 OR deleted IS NULL) ORDER BY priority"
        : "SELECT * FROM goals WHERE intervall = ? AND archive = 1 AND (deleted=0 OR deleted IS NULL) ORDER BY priority";
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [this.state.period],
        (txObj, { rows: { _array } }) => {
          console.log(_array);
          _array.map((ele, index) => {
            if (ele.time)
              tracking.transaction((tt) => {
                tt.executeSql(
                  "SELECT * FROM trackings WHERE act_id = ? AND (deleted=0 OR deleted IS NULL)",
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
                      return {
                        goals: prev.goals,
                        workedGoals: prev.workedGoals + 1,
                      };
                    });
                  }
                );
              });
            else {
              this.setState((prevState) => {
                return { workedGoals: prevState.workedGoals + 1 };
              });
            }
          });
          this.setState({ goals: _array });
        },
        (txObj, error) => console.log(error)
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
        if (this.state.loaded) this.fetchData();
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
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        );
      },
      headerRight: () => (
        <View style={styles.container}>
          {(!this.props.route.params || !this.props.route.params.archive) && (
            <HeaderIcon
              name="archive"
              onPress={() =>
                this.props.navigation.push("OverviewGoals", { archive: true })
              }
            />
          )}
          <HeaderIcon
            name="help"
            onPress={() =>
              this.props.navigation.navigate("Help", { screen: "goals" })
            }
          />
          <HeaderIcon
            name="add"
            onPress={() =>
              this.props.navigation.navigate("ChangeGoal", {
                edit: false,
              })
            }
          />
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
    this.setState({ period: view, loaded: false, workedGoals: 0 });
  };
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return <Goal goal={obj.item} navigation={this.props.navigation} />;
  };
  shouldComponentUpdate(nextProps, nextState) {
    console.log("NextState", nextState);
    if (nextState.loaded) return true;
    if (nextState.workedGoals === nextState.goals.length) {
      this.setState({ loaded: true, workedGoals: 0 });
    }
    return false;
  }
  render() {
    if (!this.state.loaded) return <LoadingScreen />;
    const changeView = this.changeView;
    return (
      <View
        style={[
          styles.mainContainer,
          styles.flexContainer,
          {
            paddingBottom: 15,
            height: "100%",
            justifyContent: "space-between",
          },
        ]}
      >
        {/* Help on empty screen */}
        {this.state.goals.length === 0 && (
          <View style={[styles.containerHorizontal, { flexWrap: "wrap" }]}>
            <Text style={styles.secondaryText}>Füge über </Text>
            <Ionicons
              name={"add"}
              size={30}
              color={colors.SecondaryTextColor}
            />
            <Text style={styles.secondaryText}>neue Ziele ein.</Text>
            <Text style={styles.secondaryText}>Hilfe kannst du über </Text>
            <Ionicons
              name={"help"}
              size={30}
              color={colors.SecondaryTextColor}
            />
            <Text style={styles.secondaryText}>erhalten</Text>
          </View>
        )}

        {/* Goals in FlatList otherwise */}
        <View>
          <FlatList
            data={this.state.goals}
            renderItem={this.renderItem}
            keyExtractor={(item) => String(item.id)}
            style={{ height: "100%" }}
          />
        </View>

        {/* View Changing Buttons */}
        <View
          style={[
            styles.containerHorizontal,
            {
              position: "absolute",
              bottom: 5,
              width: "100%",
              left: 20,
              justifyContent: "center",
            },
          ]}
        >
          <SmallPrimaryButton
            text={"Tag"}
            onPress={() => {
              if (this.state.period !== DAY) {
                changeView(DAY);
                this.fetchData();
              }
            }}
            style={{ width: "33%" }}
          />
          <SmallPrimaryButton
            text={"Woche"}
            onPress={() => {
              if (this.state.period !== WEEK) {
                changeView(WEEK);
                this.fetchData();
              }
            }}
            style={{ width: "33%" }}
          />
          <SmallPrimaryButton
            text={"Monat"}
            onPress={() => {
              if (this.state.period !== MONTH) {
                changeView(MONTH);
                this.fetchData();
              }
            }}
            style={{ width: "33%" }}
          />
        </View>
      </View>
    );
  }
}

export default OverviewGoals;
