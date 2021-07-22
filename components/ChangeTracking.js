import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Switch,
} from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";

const db = SQLite.openDatabase("aktivitys.db");
// for usage: https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
// open the database for adding the habits
const tracking = SQLite.openDatabase("aktivitys.db");

class ChangeTracking extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
      edit: edit,
      name: (() => {
        return edit ? props.route.params.name : "";
      })(),
      icon: (() => {
        return edit ? props.route.params.icon : "book-outline";
      })(),
      ...props.route.params,
    };
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        console.log(this.props.route.params);
        if (this.props.route.params && this.props.route.params.aktivity)
          this.setState({
            icon: this.props.route.params.aktivity.icon,
            name: this.props.route.params.aktivity.name,
            act_id: this.props.route.params.aktivity.id,
          });
      }
    );
    this.props.navigation.setOptions({
      title: (() => {
        return this.state.edit ? "Edit Tracking" : "Tracking hinzufügen";
      })(),
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
    });
  }
  handleSave = () => {
    const start = new Date(this.state.start_time);
    const end = new Date(this.state.end_time);
    const duration = (end - start) / 1000;
    const sql = this.props.route.params.edit
      ? "UPDATE trackings SET act_id = ? , start_time =? , end_time =?, duration_s = ? WHERE id = ?"
      : "INSERT INTO trackings (act_id, start_time, end_time, duration_s) VALUES (?, ?, ?, ?);";
    // handle change in the databases
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [
          this.state.act_id,
          this.state.start_time,
          this.state.end_time,
          duration,
          this.state.id,
        ],
        () => {
          this.props.navigation.navigate("AktivityListDetails", {
            ...this.state,
          });
        },
        (txObj, err) => {
          console.log("Fehler beim Einfügen " + err);
        }
      );
    });
  };

  render() {
    return (
      <View style={styles.backgroundColor}>
        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Aktivity: </Text>
          <Ionicons
            name={this.state.icon}
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
          <Text>{this.state.name}</Text>
          <TouchableHighlight
            style={[styles.margin, styles.padding]}
            onPress={() => {
              this.props.navigation.navigate("AktivityChooser");
            }}
          >
            <Text style={[styles.textButton]}> Change</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          onPress={() => {
            this.handleSave();
          }}
          style={[{ zIndex: -2, position: "relative" }, styles.buttonPrimary]}
        >
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ChangeTracking;
