import React from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import * as SQLite from "expo-sqlite";
import AktivityListObject from "./components/AktivityListObject.js";
import BackButton from "./components/BackButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
import TrackingHelp from "./components/TrackingHelp.js";
import LoadingScreen from "./components/LoadingScreen.js";
const db = SQLite.openDatabase("aktivitys.db");

class AktivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aktivitys: [], loaded: false };
    // get the activities from the database
    this.fetchData();
  }
  // gets the data for the activitys out of the database
  fetchData = () => {
    console.log("Fetching data for aktivity list...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities JOIN trackings ON trackings.act_id = activities.id WHERE (trackings.deleted=0 OR trackings.deleted IS NULL) ORDER BY start_time",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ loaded: true, aktivitys: _array.reverse() });
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
        if (this.state.loaded) this.fetchData();
      }
    );
    this.props.navigation.setOptions({
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
            name="help"
            onPress={() =>
              this.props.navigation.navigate("Help", { screen: "tracking" })
            }
          />
          <HeaderIcon
            name="add"
            onPress={() => {
              this.props.navigation.navigate("ChangeTracking", { edit: false });
            }}
          />
        </View>
      ),
    });
  }
  renderItem = (obj) => {
    return (
      <AktivityListObject
        tracking={obj.item}
        navigation={this.props.navigation}
      />
    );
  };
  render() {
    if (!this.state.loaded) return <LoadingScreen />;
    return (
      <View style={styles.mainContainer}>
        {/* Help on empty screen */}
        {this.state.aktivitys.length === 0 && <TrackingHelp />}

        {/* Entrys */}
        <FlatList
          renderItem={this.renderItem}
          data={this.state.aktivitys}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    );
  }
}

export default AktivityList;
