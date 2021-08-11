import React from "react";
import { View, Alert, Text, TouchableOpacity, Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "./components/PrimaryButton.js";
import BackButton from "./components/BackButton.js";
import TextButton from "./components/TextButton.js";

const db = SQLite.openDatabase("aktivitys.db");
const tracking = SQLite.openDatabase("aktivitys.db");

class ChangeTracking extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
      change: false,
      show_start_time: false,
      show_start_date: false,
      show_end_time: false,
      show_end_time: false,
      mode_start: "date",
      mode_end: "date",
      edit: edit,
      name: (() => {
        return edit ? props.route.params.name : "";
      })(),
      icon: (() => {
        return edit ? props.route.params.icon : "book-outline";
      })(),
      ...props.route.params,
      start_time: (() => {
        if (edit) return new Date(props.route.params.start_time);
        else return new Date();
      })(),
      end_time: (() => {
        if (edit) return new Date(props.route.params.end_time);
        else return new Date();
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
        if (this.props.route.params && this.props.route.params.aktivity)
          this.setState({
            icon: this.props.route.params.aktivity.icon,
            name: this.props.route.params.aktivity.name,
            act_id: this.props.route.params.aktivity.id,
            change: true,
          });
      }
    );
    this.props.navigation.setOptions({
      title: (() => {
        return this.state.edit ? "Edit Tracking" : "Tracking hinzufügen";
      })(),
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
                        this.props.navigation.goBack();
                      },
                    },
                  ]
                );
              else this.props.navigation.goBack();
            }}
          />
        );
      },
    });
  }
  handleSave = () => {
    if (!this.state.act_id) {
      alert("Bitte Aktivität auswählen");
      return;
    }
    const start = this.state.start_time;
    const end = this.state.end_time;
    const duration = (end - start) / 1000;
    if (duration < 0) {
      alert("Startzeit muss vor Endzeit liegen");
      return;
    }
    const version = this.state.version ? this.state.version + 1 : 0;
    const sql = this.props.route.params.edit
      ? "UPDATE trackings SET act_id = ? , start_time =? , end_time =?, duration_s = ?, version=? WHERE id = ?"
      : "INSERT INTO trackings (act_id, start_time, end_time, duration_s) VALUES (?, ?, ?, ?);";
    const values = this.props.route.params.edit
      ? [
          this.state.act_id,
          this.state.start_time.toISOString(),
          this.state.end_time.toISOString(),
          duration,
          version,
          this.state.id,
        ]
      : [
          this.state.act_id,
          this.state.start_time.toISOString(),
          this.state.end_time.toISOString(),
          duration,
        ];
    // handle change in the databases
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        values,
        () => {
          this.props.navigation.navigate("AktivityListDetails", {
            ...this.state,
            start_time: this.state.start_time.toISOString(),
            end_time: this.state.end_time.toISOString(),
            duration_s: duration,
          });
        },
        (txObj, err) => {
          console.log("Fehler beim Einfügen " + err);
        }
      );
    });
  };
  onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.start_time;
    this.setState({
      show_start_date: Platform.OS === "ios",
      start_time: currentDate,
      change: true,
    });
  };
  onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.start_time;
    this.setState({
      show_start_time: Platform.OS === "ios",
      start_time: currentDate,
      change: true,
    });
  };
  onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.end_time;
    this.setState({
      show_end_date: Platform.OS === "ios",
      end_time: currentDate,
      change: true,
    });
  };
  onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.end_time;
    this.setState({
      show_end_time: Platform.OS === "ios",
      end_time: currentDate,
      change: true,
    });
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Aktivity: </Text>
          <Ionicons
            name={this.state.icon}
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
          <Text>{this.state.name}</Text>
          <TextButton
            text="Change"
            onPress={() => {
              this.props.navigation.navigate("AktivityChooser", {
                target: "ChangeTracking",
              });
            }}
          />
        </View>
        <Text style={styles.secondaryText}>Startzeit: </Text>
        <View>
          <TouchableOpacity
            onPress={() =>
              this.setState((prevState) => ({
                show_start_date: !prevState.show_start_date,
              }))
            }
          >
            <Text style={[styles.normalText, styles.padding]}>
              {this.state.start_time.getDate() +
                "." +
                (this.state.start_time.getMonth() + 1)}
            </Text>
          </TouchableOpacity>
          {this.state.show_start_date && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={this.state.start_time}
              mode={"date"}
              is24Hour={true}
              maximumDate={this.state.end_time}
              display={Platform.OS === "ios" ? "compact" : "calendar"}
              onChange={this.onChangeStartDate}
            />
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              this.setState((prevState) => ({
                show_start_time: !prevState.show_start_time,
              }))
            }
          >
            <Text style={[styles.normalText, styles.padding]}>
              {this.state.start_time.getHours() +
                ":" +
                (this.state.start_time.getMinutes() < 10
                  ? "0" + this.state.start_time.getMinutes()
                  : this.state.start_time.getMinutes())}
            </Text>
          </TouchableOpacity>
          {this.state.show_start_time && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={this.state.start_time}
              mode={"time"}
              is24Hour={true}
              maximumDate={this.state.end_time}
              display={Platform.OS === "ios" ? "spinner" : "clock"}
              onChange={this.onChangeStartTime}
            />
          )}
        </View>
        <Text style={styles.secondaryText}>Endzeit:</Text>
        <View>
          <TouchableOpacity
            onPress={() =>
              this.setState((prevState) => ({
                show_end_date: !prevState.show_end_date,
              }))
            }
          >
            <Text style={[styles.normalText, styles.padding]}>
              {this.state.end_time.getDate() +
                "." +
                (this.state.end_time.getMonth() + 1)}
            </Text>
          </TouchableOpacity>
          {this.state.show_end_date && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={this.state.end_time}
              mode={"date"}
              is24Hour={true}
              display={Platform.OS === "ios" ? "compact" : "calendar"}
              minimumDate={this.state.start_time}
              onChange={this.onChangeEndDate}
            />
          )}
        </View>

        <View>
          <TouchableOpacity
            onPress={() =>
              this.setState((prevState) => ({
                show_end_time: !prevState.show_end_time,
              }))
            }
          >
            <Text style={[styles.normalText, styles.padding]}>
              {this.state.end_time.getHours() +
                ":" +
                (this.state.end_time.getMinutes() < 10
                  ? "0" + this.state.end_time.getMinutes()
                  : this.state.end_time.getMinutes())}
            </Text>
          </TouchableOpacity>
          {this.state.show_end_time && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={this.state.end_time}
              mode={"time"}
              is24Hour={true}
              minimumDate={this.state.start_time}
              display={Platform.OS === "ios" ? "spinner" : "clock"}
              onChange={this.onChangeEndTime}
            />
          )}
        </View>
        <PrimaryButton
          text={"Speichern"}
          onPress={() => {
            this.handleSave();
          }}
        />
      </View>
    );
  }
}

export default ChangeTracking;
