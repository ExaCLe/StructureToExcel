import React from "react";
import { FlatList, View, TouchableHighlight } from "react-native";
import AktivityTracker from "./AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("aktivitys.db");

class TrackingOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aktivitys: [] };
    // create a table for the habits if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE activities (id INTEGER PRIMARY KEY, name TEXT, icon TEXT, color TEXT);",
        null,
        // success
        () => {
          console.log("success");
        },
        // error
        (txObj, error) => {}
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
        [this.state.period],
        (txObj, { rows: { _array } }) => {
          this.setState({ aktivitys: _array });
        },
        () => console.error("Fehler beim Lesen der Aktivitäten. ")
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
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("ChangeAktivity", { edit: false })
            }
          >
            <Ionicons name="add" size={25} color={colors.PrimaryTextColor} />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  renderItem = (obj) => {
    return (
      <AktivityTracker activity={obj.item} navigation={this.props.navigation} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.aktivitys}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    );
  }
}

export default TrackingOverview;
