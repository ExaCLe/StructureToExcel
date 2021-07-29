import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Switch,
  Alert,
  Platform,
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
      change: false,
      aktivity_icon: "",
      aktivity_name: "",
      open1: false,
      open2: false,
      addToTracking: false,
      addToHabits: false,
      time: 0,
      icon: (() => {
        return edit ? props.route.params.icon : "book-outline";
      })(),
      items1: [
        { id: 1, title: "Priorität 1", val: 1 },
        { id: 2, title: "Priorität 2", val: 2 },
        { id: 3, title: "Priorität 3", val: 3 },
        { id: 4, title: "Priorität 4", val: 4 },
      ],

      items2: [
        { id: 1, title: "Tag", val: 1 },
        { id: 2, title: "Woche", val: 2 },
        { id: 3, title: "Monat", val: 3 },
      ],
      ...props.route.params,
      time: (() => {
        return this.props.route.params && this.props.route.params.time
          ? true
          : false;
      })(),
      zIndex: {},
      zIndex2: (() => {
        if (Platform.OS === "ios") return { zIndex: 2 };
        else return {};
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
        if (this.props.route.params && this.props.route.params.changeIcon)
          this.setState({ icon: this.props.route.params.icon, change: true });
        if (this.props.route.params && this.props.route.params.aktivity)
          this.setState({
            aktivity_icon: this.props.route.params.aktivity.icon,
            aktivity_name: this.props.route.params.aktivity.name,
            act_id: this.props.route.params.aktivity.id,
            change: true,
          });
      }
    );
    this.props.navigation.setOptions({
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

  setOpen1 = (open1) => {
    if (open1) this.setState({ open1: true, open2: false, zIndex: {} });
    else this.setState({ open1: false });
  };

  setOpen2 = (open2) => {
    if (open2)
      this.setState({ open2: true, open1: false, zIndex: { zIndex: -1 } });
    else this.setState({ open2: false });
  };

  setValue1 = (callback) => {
    this.setState((state) => ({
      priority: callback(state.priority),
      change: true,
    }));
  };

  setValue2 = (callback) => {
    this.setState((state) => ({
      intervall: callback(state.intervall),
      change: true,
    }));
  };
  handleSave = () => {
    if (!this.state.name) {
      alert("Bitte einen Namen eintragen");
      return;
    }
    if (!this.state.priority) {
      alert("Bitte eine Priorität auswählen");
      return;
    }
    if (!this.state.intervall) {
      alert("Bitte ein Intervall auswählen");
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
    if (this.state.time && !this.state.act_id) {
      alert("Bitte eine Aktivität ausfüllen");
      return;
    }
    if (!this.state.progress && !this.state.time) {
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
    // decide on the right sql command
    let sql;
    if (!this.state.edit) {
      sql =
        "INSERT INTO goals (name, intervall, priority, repetitions, icon, progress, time, act_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ";
    } else {
      sql =
        "UPDATE goals SET name=?, intervall=?, priority=?, repetitions=?, icon=?, progress=?, time=? , act_id = ? WHERE id = ?";
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
          this.state.act_id,
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
  zIndex3 = (() => {
    if (Platform.OS === "ios") return { zIndex: 3 };
    else return {};
  })();

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
              this.setState({ name: text, change: true });
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
        <View style={[styles.containerHorizontal, this.zIndex3]}>
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
            zIndex={0}
            zIndexInverse={0}
          />
        </View>

        <View
          style={[
            styles.containerHorizontal,
            this.state.zIndex2,
            this.state.zIndex,
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
        <View style={{ zIndex: -3 }}>
          <View style={styles.containerHorizontal}>
            <Switch
              style={styles.margin}
              value={this.state.time}
              onValueChange={() => {
                this.setState((prevState) => {
                  return {
                    time: !prevState.time,
                    change: true,
                  };
                });
              }}
            ></Switch>
            <Text style={styles.secondaryText}>Zeitziel</Text>
          </View>
        </View>
        {this.state.time && (
          <View style={styles.containerHorizontal}>
            <Text style={styles.secondaryText}>Dauer: </Text>
            <TextInput
              placeholder="12 h"
              value={this.state.repetitions ? this.state.repetitions + "" : ""}
              style={[
                styles.padding,
                styles.textInputSmall,
                styles.margin,
                styles.normalText,
                styles.accentColorText,
              ]}
              onChangeText={(text) => {
                if (+text || text === "")
                  this.setState({ repetitions: text, change: true });
              }}
              keyboardType="numeric"
            />
            <Text>Stunden</Text>
            <Text style={[styles.secondaryText, styles.margin]}>
              Aktivity:{" "}
            </Text>
            <Ionicons
              name={this.state.aktivity_icon}
              size={25}
              color={colors.PrimaryAccentColor}
              style={[styles.margin, styles.padding]}
            />
            <Text>{this.state.aktivity_name}</Text>
            <TouchableHighlight
              style={[styles.margin, styles.padding]}
              onPress={() => {
                this.props.navigation.navigate("AktivityChooserGoal", {
                  target: "ChangeGoal",
                });
              }}
            >
              <Text style={[styles.textButton]}> Choose Aktivity</Text>
            </TouchableHighlight>
          </View>
        )}
        {!this.state.time && (
          <View
            style={[styles.containerHorizontal, styles.center, { zIndex: -1 }]}
          >
            <TextInput
              placeholder="6"
              value={
                this.state.progress || this.state.progress === "0"
                  ? this.state.progress + ""
                  : ""
              }
              style={[
                styles.padding,
                styles.textInputSmall,
                styles.margin,
                styles.normalText,
                styles.accentColorText,
              ]}
              onChangeText={(text) => {
                if (+text || text === "" || text === "0")
                  this.setState({ progress: text, change: true });
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
                if (+text || text === "")
                  this.setState({ repetitions: text, change: true });
              }}
              keyboardType="numeric"
            />
          </View>
        )}
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
