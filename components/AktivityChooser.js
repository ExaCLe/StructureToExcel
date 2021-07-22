import React from "react";
import { View, FlatList, TouchableHighlight, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("aktivitys.db");

class AktivityChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aktivitys: [] };
    this.fetchData();
  }
  fetchData = () => {
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
  componentDidMount() {
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
                style={styles.padding}
                color={colors.PrimaryTextColor}
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
  }
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("ChangeTracking", {
              aktivity: obj.item,
            });
          }}
        >
          <View>
            <Ionicons
              name={obj.item.icon}
              size={50}
              color={colors.PrimaryAccentColor}
            />
            <Text>{obj.item.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };
  render() {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <FlatList data={this.state.aktivitys} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default AktivityChooser;
