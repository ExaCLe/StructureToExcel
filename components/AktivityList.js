import React from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
import AktivityListObject from "./AktivityListObject.js";
import BackButton from "./BackButton.js";
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
        "SELECT * FROM activities JOIN trackings ON trackings.act_id = activities.id WHERE (trackings.deleted=0 OR trackings.deleted IS NULL) ORDER BY start_time",
        null,
        (txObj, { rows: { _array } }) => {
          console.log(_array);
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
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("Help", { screen: "tracking" })
            }
          >
            <Ionicons name="help" size={25} color={colors.PrimaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
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
            <Text style={styles.secondaryText}>neue Trackings ein.</Text>
            <Text style={styles.secondaryText}>Hilfe kannst du über </Text>
            <Ionicons
              name={"help"}
              size={30}
              color={colors.SecondaryTextColor}
            />
            <Text style={styles.secondaryText}>erhalten</Text>
          </View>
        )}
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
