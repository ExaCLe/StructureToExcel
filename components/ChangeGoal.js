import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Switch,
} from "react-native";
import styles from "./styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("goals.db");
const habits = SQLite.openDatabase("habits.db");
const tracking = SQLite.openDatabase("aktivitys.db");
class ChangeGoal extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
      open1: false,
      open2: false,
      addToTracking: false,
      addToHabits: false,
      icon: (() => {
        return edit ? props.route.params.icon : "book-outline";
      })(),
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
                style={styles.padding}
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
    if (!this.state.name) {
      alert("Bitte einen Namen eintragen");
      return;
    }
    if (!this.state.priority) {
      alert("Bitte eine Priorität auswählen auswählen");
      return;
    }
    if (!this.state.intervall) {
      alert("Bitte ein Intervall auswählen auswählen");
      return;
    }
    if (!this.state.repetitions) {
      alert("Bitte eine Ziel-Zahl eintragen");
      return;
    }
    if (!this.state.icon) {
      alert("Bitte ein Icon auswählen");
      return;
    }
    if (!this.state.progress) {
      alert("Bitte einen Fortschritt eintragen");
      return;
    }

    if (this.state.addToHabits) {
      habits.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO habits (name, priority, intervall, repetitions, icon, queue) VALUES (?, ?, ?, ?, ?, ?)",
          [
            this.state.name,
            this.state.priority,
            this.state.intervall,
            parseInt(this.state.repetitions),
            this.state.icon,
            false,
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
        <TouchableHighlight
          style={[styles.margin, styles.padding]}
          onPress={() => {
            this.props.navigation.navigate("IconChooserGoals", {
              target: "ChangeGoal",
            });
          }}
        >
          <Text style={[styles.textButton]}> Wähle Icon</Text>
        </TouchableHighlight>
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
              if (+text || text === "" || text === "0")
                this.setState({ progress: text });
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
        {!this.state.edit && (
          <View style={{ zIndex: -3 }}>
            <View style={styles.containerHorizontal}>
              <Switch
                style={styles.margin}
                value={this.state.addToHabits}
                onValueChange={() => {
                  this.setState((prevState) => {
                    return {
                      addToHabits: !prevState.addToHabits,
                    };
                  });
                }}
              ></Switch>
              <Text style={styles.secondaryText}>
                Zu Gewohnheiten hinzufügen
              </Text>
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
