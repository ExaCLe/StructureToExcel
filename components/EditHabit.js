import React from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
import DropDownPicker from "react-native-dropdown-picker";
// for usage: https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

const db = SQLite.openDatabase("habits.db");

class EditHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.route.params,
      open1: false,
      open2: false,
      value1: 1,
      value2: 1,
      items1: [
        { id: 1, title: "Tag", val: 1 },
        { id: 2, title: "Woche", val: 2 },
        { id: 3, title: "Monat", val: 3 },
      ],
      items2: [
        { id: 1, title: "1", val: 1 },
        { id: 2, title: "2", val: 2 },
      ],
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Edit " + this.props.route.params.name,
    });
  }

  // handle the name change in the input field
  handleChange = (text) => {
    this.setState({ name: text });
  };

  setOpen1 = (open1) => {
    this.setState({ open1 });
  };
  setOpen2 = (open2) => {
    this.setState({ open2 });
  };

  setValue1 = (callback) => {
    this.setState((state) => ({
      value1: callback(state.value1),
    }));
  };
  setValue2 = (callback) => {
    this.setState((state) => ({
      value2: callback(state.value2),
    }));
  };

  render() {
    return (
      <View style={styles.backgroundColor}>
        <Text style={[styles.secondaryText, styles.margin]}>Name: </Text>
        <TextInput
          value={this.state.name}
          onChangeText={this.handleChange}
          style={[
            styles.normalText,
            styles.padding,
            styles.margin,
            styles.textInputLarge,
            styles.primaryAccentColor,
          ]}
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
        <Text style={[styles.secondaryText, styles.margin]}>
          Wie öft möchtest du sie erfüllen?
        </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            value={"7"}
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
          />
          <Text style={[styles.normalText, styles.accentColorText]}>
            Mal pro
          </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.open1}
            value={this.state.value1}
            items={this.state.items1}
            setOpen={this.setOpen1}
            setValue={this.setValue1}
            style={[styles.dropdown, styles.margin]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={1000}
          />
        </View>
        <View style={[styles.containerHorizontal, styles.margin]}>
          <Text
            style={[{ zIndex: -1, position: "relative" }, styles.secondaryText]}
          >
            Priorität
          </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.open2}
            value={this.state.value2}
            items={this.state.items2}
            setOpen={this.setOpen2}
            setValue={this.setValue2}
            style={[styles.dropdown, styles.margin]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={1000}
          />
        </View>
        <TouchableHighlight
          style={[{ zIndex: -1, position: "relative" }, styles.buttonPrimary]}
          onPress={() => {
            // handle change in the database
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE habits SET name=? WHERE id=?",
                [this.state.name, this.state.id],
                (txObj, resultSet) => {
                  // navigate back
                  this.props.navigation.navigate("HabitDetails", {
                    ...this.state,
                  });
                },
                null
              );
            });
          }}
        >
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[{ zIndex: -1, position: "relative" }, styles.buttonPrimary]}
        >
          <Text style={styles.primaryButtonText}>Zur Warteschlange</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EditHabit;
