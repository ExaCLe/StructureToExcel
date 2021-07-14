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
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
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
          if (this.state.edit)
            this.props.navigation.navigate("AktivityDetails", {
              ...this.state,
            });
          else this.props.navigation.goBack();
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
          style={[styles.normalText, styles.textInputLarge, styles.padding]}
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
