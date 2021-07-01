import React from "react";
import { View, TextInput, Text, TouchableHighlight } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";

// open the database for adding the habits
const db = SQLite.openDatabase("habits.db");

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      addHabit: props.route.params.addHabit,
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

  // adds a new habit to the state
  addHabit = (habit) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO habits (name) VALUES (?)",
        [this.state.name],
        () => {
          this.props.navigation.goBack();
        },
        null
      );
    });
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

  // handles the name change in input
  handleNameChange = (text) => {
    this.setState({ name: text });
  };

  render() {
    const addHabit = this.addHabit;
    return (
      <View style={styles.backgroundColor}>
        <Text style={[styles.secondaryText, styles.margin]}>Name:</Text>
        <TextInput
          style={[
            styles.normalText,
            styles.padding,
            styles.margin,
            styles.textInputLarge,
            styles.primaryAccentColor,
          ]}
          placeholder="Name"
          onChangeText={this.handleNameChange}
          value={this.state.name}
        />
        {/* View here? */}
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
          Wie oft möchtest du sie erfüllen?{" "}
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
          onPress={() => addHabit({ name: this.state.name })}
          style={[{ zIndex: -1, position: "relative" }, styles.buttonPrimary]}
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

export default AddHabit;
