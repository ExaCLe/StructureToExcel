import React from "react";
import { Text, View, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("goals.db");
class ChangeGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open1: false,
      open2: false,
      icon: "book-outline",
      items1: [
        { id: 1, title: "Priorität 1", val: 1 },
        { id: 2, title: "Priorität 2", val: 2 },
        { id: 3, title: "Priorität 3", val: 3 },
      ],

      items2: [
        { id: 1, title: "Tag", val: 1 },
        { id: 2, title: "Woche", val: 2 },
        { id: 3, title: "Monat", val: 3 },
      ],
      ...props.route.params,
    };
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

  setOpen1 = (open1) => {
    this.setState({ open1 });
  };

  setOpen2 = (open2) => {
    this.setState({ open2 });
  };

  setValue1 = (callback) => {
    this.setState((state) => ({
      priority: callback(state.priority),
    }));
  };

  setValue2 = (callback) => {
    this.setState((state) => ({
      intervall: callback(state.intervall),
    }));
  };
  handleSave = () => {
    // decide on the right sql command
    let sql;
    if (!this.state.edit) {
      sql =
        "INSERT INTO goals (name, intervall, priority, repetitions, icon, progress, time) VALUES (?, ?, ?, ?, ?, ?, ?) ";
    } else {
      sql =
        "UPDATE goals SET name=?, intervall=?, priority=?, repetitions=?, icon=?, progress=?, time=? WHERE id = ?";
    }
    // execute the sql
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [
          this.state.name,
          this.state.intervall,
          this.state.priority,
          this.state.repetitions,
          this.state.icon,
          this.state.progress,
          this.state.time,
          this.state.id,
        ],
        () => {
          if (this.state.edit)
            this.props.navigation.navigate("GoalsDetails", { ...this.state });
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
        <View style={styles.containerHorizontal}>
          <Text style={styles.secondaryText}>Name: </Text>
          <TextInput
            placeholder="Name"
            value={this.state.name}
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
          />
        </View>

        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Icon: </Text>
          <Ionicons
            name={this.state.icon}
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
        </View>
        <View style={[styles.containerHorizontal, { zIndex: 3 }]}>
          <Text style={styles.secondaryText}>Intervall: </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.open2}
            value={this.state.intervall}
            items={this.state.items2}
            setOpen={this.setOpen2}
            setValue={this.setValue2}
            style={[styles.dropdown, styles.margin, styles.fullSize]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={5000}
            zIndexInverse={5000}
          />
        </View>

        <View
          style={[
            styles.containerHorizontal,
            { zIndex: 2, position: "relative" },
          ]}
        >
          <Text style={styles.secondaryText}>Priorität: </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.open1}
            value={this.state.priority}
            items={this.state.items1}
            setOpen={this.setOpen1}
            setValue={this.setValue1}
            style={[styles.dropdown, styles.margin, styles.fullSize]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={1000}
            zIndexInverse={1000}
          />
        </View>
        <View
          style={[styles.containerHorizontal, styles.center, { zIndex: -1 }]}
        >
          <TextInput
            placeholder="6"
            value={this.state.progress ? this.state.progress + "" : ""}
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
            onChangeText={(text) => {
              if (+text || text === "") this.setState({ progress: text });
            }}
            keyboardType="numeric"
          />
          <Text style={styles.secondaryText}>von</Text>
          <TextInput
            placeholder="12"
            value={this.state.repetitions ? this.state.repetitions + "" : ""}
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
            onChangeText={(text) => {
              if (+text || text === "") this.setState({ repetitions: text });
            }}
            keyboardType="numeric"
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonPrimary, { zIndex: -3 }]}
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

export default ChangeGoal;
