import React from "react";
import { View, TextInput, Text, TouchableHighlight } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
// for usage: https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
// open the database for adding the habits
const db = SQLite.openDatabase("habits.db");

class ChangeHabit extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
      edit: edit,
      name: (() => {
        return edit ? props.route.params.name : "";
      })(),
      openIntervall: false,
      openPriority: false,
      valueIntervall: (() => {
        return edit ? props.route.params.intervall : 1;
      })(),
      valuePriority: (() => {
        return edit ? props.route.params.priority : 1;
      })(),
      itemsIntervall: [
        { id: 1, title: "Tag", val: 1 },
        { id: 2, title: "Woche", val: 2 },
        { id: 3, title: "Monat", val: 3 },
      ],
      itemsPriority: [
        { id: 1, title: "1", val: 1 },
        { id: 2, title: "2", val: 2 },
      ],
      repetitions: (() => {
        return edit ? "" + props.route.params.repetitions : "7";
      })(),
      id: props.route.params.id,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: (() => {
        return this.state.edit
          ? "Edit " + this.state.name
          : "Gewohnheit hinzufügen";
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
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
  }

  // adds a new habit to the state
  addHabit = (queue) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO habits (name, priority, intervall, repetitions, icon, queue) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.state.name,
          this.state.valuePriority,
          this.state.valueIntervall,
          parseInt(this.state.repetitions),
          this.state.icon,
          queue,
        ],
        () => {
          if (!queue) this.props.navigation.navigate("HabitOverview");
          else this.props.navigation.navigate("HabitsQueue");
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  updateHabits = () => {
    // handle change in the databases
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE habits SET name=?, intervall=?, priority=?, repetitions=? WHERE id=?",
        [
          this.state.name,
          this.state.valueIntervall,
          this.state.valuePriority,
          this.state.repetitions,
          this.state.id,
        ],
        (txObj, resultSet) => {
          this.props.navigation.navigate("HabitDetails", {
            ...this.state,
          });
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  setOpenIntervall = (openIntervall) => {
    this.setState({ openIntervall });
  };
  setOpenPriority = (openPriority) => {
    this.setState({ openPriority });
  };

  setValueIntervall = (callback) => {
    this.setState((state) => ({
      valueIntervall: callback(state.valueIntervall),
    }));
  };
  setValuePriority = (callback) => {
    this.setState((state) => ({
      valuePriority: callback(state.valuePriority),
    }));
  };

  // handles the name change in input
  handleNameChange = (text) => {
    this.setState({ name: text });
  };

  handleRepetitionChange = (number) => {
    if (+number || number == "") this.setState({ repetitions: number });
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
            value={this.state.repetitions}
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
            onChangeText={this.handleRepetitionChange}
            keyboardType="numeric"
          />
          <Text style={[styles.normalText, styles.accentColorText]}>
            Mal pro
          </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.openIntervall}
            value={this.state.valueIntervall}
            items={this.state.itemsIntervall}
            setOpen={this.setOpenIntervall}
            setValue={this.setValueIntervall}
            style={[styles.dropdown, styles.margin]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={1000}
          />
        </View>
        <View
          style={[styles.containerHorizontal, styles.margin, { zIndex: -1 }]}
        >
          <Text
            style={[{ zIndex: -2, position: "relative" }, styles.secondaryText]}
          >
            Priorität
          </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.openPriority}
            value={this.state.valuePriority}
            items={this.state.itemsPriority}
            setOpen={this.setOpenPriority}
            setValue={this.setValuePriority}
            style={[styles.dropdown, styles.margin]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={999}
          />
        </View>
        <TouchableHighlight
          onPress={() => {
            if (this.state.edit) this.updateHabits();
            else {
              addHabit(0);
            }
          }}
          style={[{ zIndex: -2, position: "relative" }, styles.buttonPrimary]}
        >
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableHighlight>
        {!this.state.edit && (
          <TouchableHighlight
            style={[{ zIndex: -2, position: "relative" }, styles.buttonPrimary]}
            onPress={() => {
              addHabit(1);
            }}
          >
            <Text style={styles.primaryButtonText}>Zur Warteschlange</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

export default ChangeHabit;
