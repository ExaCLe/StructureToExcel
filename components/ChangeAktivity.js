import React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
} from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("aktivitys.db");

class AddAktivity extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
      ...this.props.route.params,
      icon: (() => {
        return edit ? props.route.params.icon : "book-outline";
      })(),
    };
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        if (this.props.route.params && this.props.route.params.icon)
          this.setState({ icon: this.props.route.params.icon });
      }
    );
    const title = this.props.route.params.edit
      ? "Aktvität bearbeiten"
      : "Aktivität hinzufügen";
    this.props.navigation.setOptions({
      title: title,
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
    // add trash icon if edit
    if (this.state.edit) {
      this.props.navigation.setOptions({
        headerRight: () => {
          return (
            <TouchableHighlight
              style={styles.buttonTopBar}
              underlayColor="#ffffff"
              onPress={() => {
                db.transaction((tx) => {
                  tx.executeSql(
                    "DELETE FROM activities WHERE id=?",
                    [this.props.route.params.id],
                    () => {
                      this.props.navigation.goBack();
                    },
                    () => {
                      console.log("Fehler beim Löschen der Aktivität");
                    }
                  );
                });
              }}
            >
              <Ionicons
                name="trash"
                size={25}
                color={colors.PrimaryTextColor}
              />
            </TouchableHighlight>
          );
        },
      });
    }
  }
  handleSave = () => {
    // decide on the right sql command
    let sql;
    let variables;
    if (!this.props.route.params.edit) {
      sql = "INSERT INTO activities (name, icon) VALUES (?, ?) ";
      variables = [this.state.name, this.state.icon];
    } else {
      sql = "UPDATE activities SET name=?, icon=? WHERE id = ?";
      variables = [this.state.name, this.state.icon, this.state.id];
    }
    // execute the sql
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        variables,
        () => {
          this.props.navigation.goBack();
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };
  render() {
    return (
      <View style={styles.margin}>
        <Text style={[styles.secondaryText]}>Name: </Text>
        <TextInput
          placeholder="Name"
          value={this.state.name}
          style={[
            styles.normalText,
            styles.textInputLarge,
            styles.padding,
            styles.accentColorText,
          ]}
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
        />
        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Icon: </Text>
          <Ionicons
            name={this.state.icon}
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
          <TouchableHighlight
            style={[styles.margin, styles.padding]}
            onPress={() => {
              this.props.navigation.navigate("IconChooserTracking", {
                target: "ChangeAktivity",
              });
            }}
          >
            <Text style={[styles.textButton]}> Wähle Icon</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() => {
            this.handleSave();
          }}
        >
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AddAktivity;
