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
    this.state = { ...this.props.route.params };
  }
  componentDidMount() {
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
    if (!this.props.route.params.edit) {
      sql = "INSERT INTO activities (name, icon) VALUES (?, ?) ";
    } else {
      sql = "UPDATE activities SET name=?, icon=? WHERE id = ?";
    }
    // execute the sql
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [this.state.name, this.state.icon, this.state.id],
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
            name="book-outline"
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
          <TouchableHighlight style={[styles.margin, styles.padding]}>
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
