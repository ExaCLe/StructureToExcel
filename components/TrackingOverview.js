import React from "react";
import { FlatList, View, TouchableOpacity, ScrollView } from "react-native";
import AktivityTracker from "./AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./App.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("aktivitys.db");

class TrackingOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aktivitys: [] };
    // create a table for the activities if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE activities (id INTEGER PRIMARY KEY, name TEXT, icon TEXT, color TEXT);",
        null,
        // success
        () => {},
        // error
        (txObj, error) => {}
      );
    });
    // create the table for the tracking entries
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE trackings (id INTEGER PRIMARY KEY, act_id INTEGER, start_time TEXT, end_time TEXT, duration_s INTEGER , FOREIGN KEY (act_id) REFERENCES activities(id)); ",
        null,
        () => {},
        () => {}
      );
    });
    // get the activities from the database
    this.fetchData();
  }
  // gets the data for the activitys out of the database
  fetchData = () => {
    console.log("Fetching data for aktivitys...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ aktivitys: _array });
        },
        (txObj, error) =>
          console.error("Fehler beim Lesen der Aktivitäten. " + error)
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
      headerRight: () => (
        <View style={styles.container}>
          <TouchableOpacity
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("ChangeAktivity", {
                edit: false,
                target: "TrackingOverview",
              })
            }
          >
            <Ionicons name="add" size={25} color={colors.PrimaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("AktivityList")}
          >
            <Ionicons name="map" size={25} color={colors.PrimaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.state.aktivitys.map((activity) => (
            <AktivityTracker
              AktivityTracker
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
