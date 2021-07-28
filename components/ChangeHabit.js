import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Switch,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
// for usage: https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
// open the database for adding the habits
const db = SQLite.openDatabase("habits.db");
const goals = SQLite.openDatabase("goals.db");
const tracking = SQLite.openDatabase("aktivitys.db");

class ChangeHabit extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
      change: false,
      edit: edit,
      name: (() => {
        return edit ? props.route.params.name : "";
      })(),
      icon: (() => {
        return edit ? props.route.params.icon : "book-outline";
      })(),
      addToGoals: false,
      addToTracking: false,
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
        { id: 3, title: "3", val: 3 },
        { id: 4, title: "4", val: 4 },
      ],
      repetitions: (() => {
        return edit ? "" + props.route.params.repetitions : "";
      })(),
      id: props.route.params.id,
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
          this.setState({ icon: this.props.route.params.icon, change: true });
      }
    );
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
                if (this.state.change && this.state.edit)
                  Alert.alert(
                    "Abort Changes",
                    "Möchtest du wirklich die Veränderungen verwerfen?",
                    [
                      { text: "Nein" },
                      {
                        text: "Ja",
                        onPress: () => {
                          this.props.navigation.goBack();
                        },
                      },
                    ]
                  );
                else this.props.navigation.goBack();
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
  checkComplete = () => {
    if (!this.state.name) {
      alert("Bitte einen Namen eintragen");
      return false;
    }
    if (!this.state.valuePriority) {
      alert("Bitte eine Priorität auswählen");
      return false;
    }
    if (!this.state.valueIntervall) {
      alert("Bitte ein Intervall auswählen");
      return false;
    }
    if (!this.state.repetitions) {
      alert("Bitte eine Ziel-Zahl eintragen");
      return false;
    }
    if (!this.state.icon) {
      alert("Bitte ein Icon auswählen");
      return false;
    }
    return true;
  };
  // adds a new habit to the state
  addHabit = (queue) => {
    if (!this.checkComplete()) return;
    if (this.state.addToGoals) {
      goals.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO goals (name, intervall, priority, repetitions, icon, progress, time) VALUES (?, ?, ?, ?, ?, ?, ?) ",
          [
            this.state.name,
            this.state.valueIntervall,
            this.state.valuePriority,
            parseInt(this.state.repetitions),
            this.state.icon,
            0,
            false,
          ],
          () => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    }
    if (this.state.addToTracking) {
      tracking.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO activities (name, icon) VALUES (?, ?) ",
          [this.state.name, this.state.icon],
          () => {},
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    }
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
        "UPDATE habits SET name=?, intervall=?, priority=?, repetitions=?, icon=? WHERE id=?",
        [
          this.state.name,
          this.state.valueIntervall,
          this.state.valuePriority,
          this.state.repetitions,
          this.state.icon,
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
      change: true,
    }));
  };
  setValuePriority = (callback) => {
    this.setState((state) => ({
      valuePriority: callback(state.valuePriority),
      change: true,
    }));
  };

  // handles the name change in input
  handleNameChange = (text) => {
    this.setState({ name: text, change: true });
  };

  handleRepetitionChange = (number) => {
    if (+number || number == "")
      this.setState({ repetitions: number, change: true });
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
            name={this.state.icon}
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
          <TouchableHighlight
            style={[styles.margin, styles.padding]}
            onPress={() => {
              this.props.navigation.navigate("IconChooserHabits", {
                target: "ChangeHabit",
              });
            }}
          >
            <Text style={[styles.textButton]}> Wähle Icon</Text>
          </TouchableHighlight>
        </View>
        <Text style={[styles.secondaryText, styles.margin]}>
          Wie oft möchtest du sie erfüllen?{" "}
        </Text>
        <View style={styles.containerHorizontal}>
          <TextInput
            placeholder={"7"}
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
        {!this.state.edit && (
          <View style={{ zIndex: -3 }}>
            <View style={styles.containerHorizontal}>
              <Switch
                style={styles.margin}
                value={this.state.addToGoals}
                onValueChange={() => {
                  this.setState((prevState) => {
                    return {
                      addToGoals: !prevState.addToGoals,
                    };
                  });
                }}
              ></Switch>
              <Text style={styles.secondaryText}>Zu Zielen hinzufügen</Text>
            </View>
            <View style={styles.containerHorizontal}>
              <Switch
                style={styles.margin}
                value={this.state.addToTracking}
                onValueChange={() => {
                  this.setState((prevState) => {
                    return {
                      addToTracking: !prevState.addToTracking,
                    };
                  });
                }}
              ></Switch>
              <Text style={styles.secondaryText}>Zu Aktvitäten hinzufügen</Text>
            </View>
          </View>
        )}

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
