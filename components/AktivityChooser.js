import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(this.props.route.params.target);
              }}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                style={styles.padding}
                color={colors.PrimaryTextColor}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonTopBar}
            onPress={() => {
              if (this.props.route.params.target === "ChangeGoal")
                this.props.navigation.navigate("ChangeAktivityGoals", {
                  edit: false,
                  target: "AktivityChooserGoal",
                });
              else if (this.props.route.params.target === "ChangeTracking")
                this.props.navigation.navigate("ChangeAktivity", {
                  edit: false,
                  target: "AktivityChooser",
                });
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
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(this.props.route.params.target, {
              aktivity: obj.item,
            });
          }}
        >
          <View>
            <Ionicons name={obj.item.icon} size={50} color={global.color} />
            <Text>{obj.item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <FlatList
          data={this.state.aktivitys}
          renderItem={this.renderItem}
          keyExtractor={(ele) => String(ele.id)}
        />
      </View>
    );
  }
}

export default AktivityChooser;
