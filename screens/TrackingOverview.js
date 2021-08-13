import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AktivityTracker from "./components/AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import * as SQLite from "expo-sqlite";
import HeaderIcon from "./components/HeaderIcon.js";
import LoadingScreen from "./components/LoadingScreen.js";
const db = SQLite.openDatabase("aktivitys.db");

class TrackingOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aktivitys: [], loaded: false };
    this.createDatabases();
  }
  createDatabases = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY, name TEXT, icon TEXT, color TEXT, deleted BOOLEAN DEFAULT 0, object_id TEXT, version INTEGER DEFAULT 0);",
        null,
        // success
        () => {},
        // error
        (txObj, error) => {
          console.log(error);
        }
      );
    });
    // create the table for the tracking entries
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE trackings (id INTEGER PRIMARY KEY, act_id INTEGER, start_time TEXT, end_time TEXT, duration_s INTEGER, deleted BOOLEAN DEFAULT 0, object_id_tracking TEXT, version INTEGER DEFAULT 0, FOREIGN KEY (act_id) REFERENCES activities(id)); ",
        null,
        () => {},
        () => {}
      );
    });
    // get the activities from the database
    this.fetchData();
  };
  // gets the data for the activitys out of the database
  fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities WHERE (deleted=0 OR deleted IS NULL)",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ aktivitys: _array, loaded: true });
        },
        (txObj, error) => this.createDatabases()
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
      headerRight: () => (
        <View style={styles.container}>
          <HeaderIcon
            name="help"
            onPress={() =>
              this.props.navigation.navigate("Help", { screen: "aktivities" })
            }
          />
          <HeaderIcon
            name="add"
            onPress={() =>
              this.props.navigation.navigate("ChangeAktivity", {
                edit: false,
                target: "TrackingOverview",
              })
            }
          />
          <HeaderIcon
            name="list"
            onPress={() => this.props.navigation.navigate("AktivityList")}
          />
        </View>
      ),
    });
  }
  render() {
    if (!this.state.loaded) return <LoadingScreen />;
    return (
      <View style={[styles.mainContainer, { display: "flex" }]}>
        <ScrollView>
          {this.state.aktivitys.length === 0 && (
            <View
              style={[
                styles.containerHorizontal,
                styles.margin,
                styles.padding,
                { flexWrap: "wrap" },
              ]}
            >
              <Text style={styles.secondaryText}>Füge über </Text>
              <Ionicons
                name={"add"}
                size={30}
                color={colors.SecondaryTextColor}
              />
              <Text style={styles.secondaryText}>neue Aktivitäten ein.</Text>
              <Text style={styles.secondaryText}>Hilfe kannst du über </Text>
              <Ionicons
                name={"help"}
                size={30}
                color={colors.SecondaryTextColor}
              />
              <Text style={styles.secondaryText}>erhalten</Text>
            </View>
          )}
          {this.state.aktivitys.map((activity) => (
            <AktivityTracker
              activity={activity}
              navigation={this.props.navigation}
              key={String(activity.id)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default TrackingOverview;
