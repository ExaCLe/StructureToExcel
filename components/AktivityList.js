import React from "react";
import { FlatList, View, TouchableHighlight, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
import AktivityListObject from "./AktivityListObject.js";
const db = SQLite.openDatabase("aktivitys.db");

class AktivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aktivitys: [] };
    // get the activities from the database
    this.fetchData();
  }
  // gets the data for the activitys out of the database
  fetchData = () => {
    console.log("Fetching data for aktivity list...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities JOIN trackings ON trackings.act_id = activities.id",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ aktivitys: _array.reverse() });
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
      headerLeft: () => {
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
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.buttonTopBar}
            onPress={() => {
              this.props.navigation.navigate("ChangeTracking", { edit: false });
            }}
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
  renderItem = (obj) => {
    return (
      <AktivityListObject
        tracking={obj.item}
        navigation={this.props.navigation}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
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
