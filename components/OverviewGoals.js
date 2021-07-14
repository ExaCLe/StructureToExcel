import React from "react";
import { Text, View, Button, TouchableHighlight, FlatList } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import Goal from "./Goal.js";
import * as SQLite from "expo-sqlite";
import { DAY, WEEK, MONTH } from "./../assets/intervals.js";
const db = SQLite.openDatabase("goals.db");

class OverviewGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goals: [], period: DAY };
    // create a table for the habits if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE goals (id INTEGER PRIMARY KEY, name TEXT, priority INTEGER, intervall INTEGER, repetitions INTEGER, icon TEXT, progress INT, time BOOLEAN);",
        null,
        // success
        () => {
          console.log("success");
        },
        // error
        (txObj, error) => {}
      );
    });
    // get the goals from the database
    this.fetchData();
  }
  // gets the data for the goals out of the database
  fetchData = () => {
    console.log("Fetching data for goals...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goals WHERE intervall = ?",
        [this.state.period],
        (txObj, { rows: { _array } }) => {
          this.setState({ goals: _array });
        },
        () => console.error("Fehler beim Lesen der Ziele. ")
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
        if (this.state.period === DAY) return "Zielübersicht Tag";
        else if (this.state.period === WEEK) return "Zielübersicht Woche";
        else return "Zielübersicht Monat";
      })(),
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("ChangeGoal", {
                edit: false,
              })
            }
          >
            <Ionicons name="add" size={25} color={colors.PrimaryTextColor} />
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
