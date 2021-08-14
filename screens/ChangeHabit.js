import React from "react";
import { View, Text, Switch, Alert, Platform, ScrollView } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import { Picker } from "@react-native-picker/picker";
import * as colors from "../assets/colors.js";
import PrimaryButton from "./components/PrimaryButton.js";
import BackButton from "./components/BackButton.js";
import TextfieldAndLabel from "./components/TextfieldAndLabel.js";
import Textfield from "./components/Textfield.js";
import IconRowWithChange from "./components/IconRowWithChange.js";
import InformationRow from "./components/InformationRow.js";
// for usage: https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
// open the database for adding the habits
const db = SQLite.openDatabase("habits.db");
const goals = SQLite.openDatabase("goals.db");
const tracking = SQLite.openDatabase("aktivitys.db");

class ChangeHabit extends React.Component {
  constructor(props) {
    super(props);
    let edit;
    if (props.route.params) edit = props.route.params.edit;
    else edit = false;
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
      priority: false,
      intervall: (() => {
        return edit ? "" + props.route.params.intervall : "";
      })(),
      valuePriority: (() => {
        return edit ? "" + props.route.params.priority : "";
      })(),
      goalIntervall: 1,
      repetitions: (() => {
        return edit ? "" + props.route.params.repetitions : "";
      })(),
      priority: (() => {
        return edit ? props.route.params.priority : 1;
      })(),
      version: (() => {
        return edit ? props.route.params.version : 0;
      })(),
      id: (() => {
        return edit ? props.route.params.id : undefined;
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
          <BackButton
            onPress={() => {
              this.confirmAbort();
            }}
          />
        );
      },
    });
  }

  confirmAbort = () => {
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
  };
  checkComplete = () => {
    if (!this.state.name) {
      alert("Bitte einen Namen eintragen");
      return false;
    }
    if (!this.state.priority) {
      alert("Bitte eine Priorität auswählen");
      return false;
    }
    if (!this.state.intervall) {
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
    if (this.state.repetitions > this.state.intervall) {
      alert(
        "Maximal einmal pro Tag ausführbar. Bitte maximal n Mal in n Tagen als Ziel setzen. "
      );
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
            this.state.goalIntervall,
            this.state.priority,
            this.state.repetitions,
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
        "INSERT INTO habits (name, priority, intervall, repetitions, icon, queue, updatedAt) VALUES (?, ?, ?, ?, ?, ?, DATETIME('now'))",
        [
          this.state.name,
          this.state.priority,
          this.state.intervall,
          parseInt(this.state.repetitions),
          this.state.icon,
          queue,
        ],
        () => {
          if (!queue) this.props.navigation.navigate("HabitOverview");
          else this.props.navigation.navigate("HabitsQueue");
        },
        (txObj, error) => {
          alert("Speichern nicht erfolgreich. Bitte erneut versuchen.");
          console.log(error);
        }
      );
    });
  };
  height = (() => {
    if (Platform.OS === "ios") return { width: "50%", alignSelf: "center" };
    else return { height: 60 };
  })();
  updateHabits = () => {
    // handle change in the databases
    console.log(this.state);
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE habits SET name=?, intervall=?, priority=?, repetitions=?, icon=?, updatedAt=DATETIME('now'), version=? WHERE id=?",
        [
          this.state.name,
          this.state.intervall,
          this.state.priority,
          this.state.repetitions,
          this.state.icon,
          this.state.version + 1,
          this.state.id,
        ],
        (txObj, resultSet) => {
          console.log(this.state);
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
  setOpenPriority = (openPriority) => {
    if (openPriority) this.setState({ openPriority: true });
    else this.setState({ openPriority: false });
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
  handleIntervallChange = (number) => {
    if (+number || number == "")
      this.setState({ intervall: number, change: true });
  };

  render() {
    const addHabit = this.addHabit;
    return (
      <ScrollView
        style={[styles.mainContainer]}
        keyboardShouldPersistTaps="handled"
      >
        <TextfieldAndLabel
          placeholder="Name"
          onChangeText={this.handleNameChange}
          value={this.state.name}
          label="Name: "
          width="70%"
        />
        <IconRowWithChange
          onPress={() => {
            this.props.navigation.navigate("IconChooserHabits", {
              target: "ChangeHabit",
            });
          }}
          icon={this.state.icon}
        />
        <Text style={[styles.secondaryText, styles.topDownMargin]}>
          Wie oft möchtest du sie erfüllen?{" "}
        </Text>
        <View style={[styles.containerHorizontal, styles.topDownMargin]}>
          <Textfield
            onChangeText={this.handleRepetitionChange}
            keyboardType="numeric"
            placeholder={"7"}
            value={this.state.repetitions}
            width="20%"
            textAlign="center"
          />
          <Text
            style={[styles.normalText, { color: global.color }, styles.margin]}
          >
            Mal in
          </Text>

          <Textfield
            onChangeText={this.handleIntervallChange}
            keyboardType="numeric"
            placeholder={"7"}
            value={this.state.intervall}
            width="20%"
            textAlign="center"
          />
          <Text
            style={[styles.normalText, { color: global.color }, styles.margin]}
          >
            Tagen
          </Text>
        </View>
        <InformationRow label="Priorität:" content={this.state.priority} />

        <Picker
          style={this.height}
          selectedValue={this.state.priority}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ priority: itemValue })
          }
        >
          <Picker.Item label="Priorität 1" value="1" color={global.color} />
          <Picker.Item label="Priorität 2" value="2" color={global.color} />
          <Picker.Item label="Priorität 3" value="3" color={global.color} />
          <Picker.Item label="Priorität 4" value="4" color={global.color} />
        </Picker>
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
            {this.state.addToGoals && (
              <View>
                <Text style={styles.secondaryText}>
                  Intervall für die Ziele:
                </Text>
                <Picker
                  style={this.height}
                  selectedValue={this.state.goalIntervall}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ goalIntervall: itemValue })
                  }
                >
                  <Picker.Item label="Tag" value="1" color={global.color} />
                  <Picker.Item label="Woche" value="2" color={global.color} />
                  <Picker.Item label="Monat" value="3" color={global.color} />
                </Picker>
              </View>
            )}
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
        <PrimaryButton
          text={"Speichern"}
          onPress={() => {
            if (this.state.edit) this.updateHabits();
            else {
              addHabit(0);
            }
          }}
        />
        {!this.state.edit && (
          <PrimaryButton
            text={"Zur Warteschlange"}
            onPress={() => {
              addHabit(1);
            }}
          />
        )}
      </ScrollView>
    );
  }
}

export default ChangeHabit;
