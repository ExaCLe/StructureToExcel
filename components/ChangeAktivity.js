import React from "react";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import * as SQLite from "expo-sqlite";
import PrimaryButton from "./PrimaryButton.js";
import BackButton from "./BackButton.js";
import TextfieldAndLabel from "./TextfieldAndLabel.js";
const db = SQLite.openDatabase("aktivitys.db");

class AddAktivity extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
      change: false,
      ...this.props.route.params,
      icon: (() => {
        return edit ? props.route.params.icon : "book-outline";
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
    const title = this.props.route.params.edit
      ? "Aktvität bearbeiten"
      : "Aktivität hinzufügen";
    this.props.navigation.setOptions({
      title: title,
      headerLeft: () => {
        return (
          <BackButton
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
                        this.props.navigation.navigate(
                          this.props.route.params.target
                        );
                      },
                    },
                  ]
                );
              else
                this.props.navigation.navigate(this.props.route.params.target);
            }}
          />
        );
      },
    });
    // add trash icon if edit
    if (this.state.edit) {
      this.props.navigation.setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity
              style={styles.buttonTopBar}
              underlayColor="#ffffff"
              onPress={() => {
                db.transaction((tx) => {
                  tx.executeSql(
                    "UPDATE activities SET deleted=1, version=? WHERE id=?",
                    [
                      this.props.route.params.version + 1,
                      this.props.route.params.id,
                    ],
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
            </TouchableOpacity>
          );
        },
      });
    }
  }
  handleSave = () => {
    // decide on the right sql command
    let sql;
    let variables;
    if (!this.state.name) {
      alert("Bitte einen Namen eintragen");
      return;
    }
    if (!this.state.icon) {
      alert("Bitte ein Icon auswählen");
      return;
    }

    if (!this.props.route.params.edit) {
      sql = "INSERT INTO activities (name, icon) VALUES (?, ?) ";
      variables = [this.state.name, this.state.icon];
    } else {
      sql = "UPDATE activities SET name=?, icon=?, version=? WHERE id = ?";
      variables = [
        this.state.name,
        this.state.icon,
        this.state.version + 1,
        this.state.id,
      ];
    }
    // execute the sql
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        variables,
        () => {
          this.props.navigation.navigate(this.props.route.params.target);
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
        <TextfieldAndLabel
          onChangeText={(text) => {
            this.setState({ name: text, change: true });
          }}
          placeholder="Name"
          value={this.state.name}
          label={"Name: "}
          width={"50%"}
        />
        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Icon: </Text>
          <Ionicons
            name={this.state.icon}
            size={25}
            color={global.color}
            style={[styles.margin, styles.padding]}
          />
          <TouchableOpacity
            style={[styles.margin, styles.padding]}
            onPress={() => {
              if (this.props.route.params.target === "AktivityDetails")
                this.props.navigation.navigate("IconChooserTracking", {
                  target: "ChangeAktivity",
                });
              else if (this.props.route.params.target == "AktivityChooserGoal")
                this.props.navigation.navigate("IconChooserGoals", {
                  target: "ChangeAktivityGoals",
                });
              else if (this.props.route.params.target == "AktivityChooser")
                this.props.navigation.navigate("IconChooserTracking", {
                  target: "ChangeAktivity",
                });
              else
                this.props.navigation.navigate("IconChooserTracking", {
                  target: "ChangeAktivity",
                });
            }}
          >
            <Text style={[styles.textButton, { color: global.color }]}>
              {" "}
              Wähle Icon
            </Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton
          onPress={() => {
            this.handleSave();
          }}
          text={"Speichern"}
        />
      </View>
    );
  }
}

export default AddAktivity;
