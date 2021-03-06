import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "../assets/colors.js";
import * as SQLite from "expo-sqlite";
import BackButton from "./components/BackButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
import Divider from "./components/Divider.js";
import LoadingScreen from "./components/LoadingScreen.js";
const db = SQLite.openDatabase("aktivitys.db");

class AktivityChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aktivitys: [], loaded: false };
    this.fetchData();
  }
  fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities WHERE (deleted=0 OR deleted IS NULL)",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ aktivitys: _array, loaded: true });
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
      title: "Aktivität wählen",
      headerLeft: () => {
        return (
          <BackButton
            onPress={() =>
              this.props.navigation.navigate(
                this.props.route.params.targetAktivity
              )
            }
          />
        );
      },
      headerRight: () => (
        <View style={styles.row}>
          <HeaderIcon
            onPress={() => {
              if (this.props.route.params.targetAktivity === "ChangeGoal")
                this.props.navigation.navigate("ChangeAktivityGoals", {
                  edit: false,
                  targetChange: "AktivityChooserGoal",
                });
              else if (
                this.props.route.params.targetAktivity === "ChangeTracking"
              )
                this.props.navigation.navigate("ChangeAktivity", {
                  edit: false,
                  targetChange: "AktivityChooser",
                });
            }}
            name="add"
          />
        </View>
      ),
    });
  }
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <View style={styles.paddingBottom}>
        <TouchableOpacity
          onPress={() => {
            console.log(this.props.route.params);
            this.props.navigation.navigate(
              this.props.route.params.targetAktivity,
              {
                aktivity: obj.item,
              }
            );
          }}
        >
          <View style={[styles.containerHorizontal]}>
            <Ionicons name={obj.item.icon} size={50} color={global.color} />
            <Text style={styles.primaryText}>{obj.item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    if (!this.state.loaded) return <LoadingScreen />;
    return (
      <View stlye={styles.mainContainer}>
        <FlatList
          data={this.state.aktivitys}
          renderItem={this.renderItem}
          keyExtractor={(ele) => String(ele.id)}
          style={[styles.padding, styles.margin, styles.fullHeight]}
          ItemSeparatorComponent={Divider}
        />
      </View>
    );
  }
}

export default AktivityChooser;
