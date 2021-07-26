import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Switch,
  Platform,
} from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import DateTimePicker from "@react-native-community/datetimepicker";

const db = SQLite.openDatabase("aktivitys.db");
const tracking = SQLite.openDatabase("aktivitys.db");

class ChangeTracking extends React.Component {
  constructor(props) {
    super(props);
    const edit = props.route.params.edit;
    this.state = {
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
      start_time: new Date(props.route.params.start_time),
      end_time: new Date(props.route.params.end_time),
    };
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        console.log(this.props.route.params);
        if (this.props.route.params && this.props.route.params.aktivity)
          this.setState({
            icon: this.props.route.params.aktivity.icon,
            name: this.props.route.params.aktivity.name,
            act_id: this.props.route.params.aktivity.id,
          });
      }
    );
    this.props.navigation.setOptions({
      title: (() => {
        return this.state.edit ? "Edit Tracking" : "Tracking hinzufügen";
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
                style={styles.padding}
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
  }
  handleSave = () => {
    const start = this.state.start_time;
    const end = this.state.end_time;
    const duration = (end - start) / 1000;
    if (duration < 0) {
      alert("Startzeit muss vor Endzeit liegen");
      return;
    }
    const sql = this.props.route.params.edit
      ? "UPDATE trackings SET act_id = ? , start_time =? , end_time =?, duration_s = ? WHERE id = ?"
      : "INSERT INTO trackings (act_id, start_time, end_time, duration_s) VALUES (?, ?, ?, ?);";
    // handle change in the databases
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [
          this.state.act_id,
          this.state.start_time.toISOString(),
          this.state.end_time.toISOString(),
          duration,
          this.state.id,
        ],
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
    });
  };
  onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.start_time;
    this.setState({
      show_start_time: Platform.OS === "ios",
      start_time: currentDate,
    });
  };
  onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.end_time;
    this.setState({
      show_end_date: Platform.OS === "ios",
      end_time: currentDate,
    });
  };
  onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.end_time;
    this.setState({
      show_end_time: Platform.OS === "ios",
      end_time: currentDate,
    });
  };

  render() {
    return (
      <View style={styles.backgroundColor}>
        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Aktivity: </Text>
          <Ionicons
            name={this.state.icon}
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
          <Text>{this.state.name}</Text>
          <TouchableHighlight
            style={[styles.margin, styles.padding]}
            onPress={() => {
              this.props.navigation.navigate("AktivityChooser");
            }}
          >
            <Text style={[styles.textButton]}> Change</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.secondaryText}>Startzeit: </Text>
        <View>
          <TouchableHighlight
            onPress={() =>
              this.setState((prevState) => ({
                show_start_date: !prevState.show_start_date,
              }))
            }
          >
            <Text style={[styles.normalText, styles.padding]}>
              {this.state.start_time.getDate() +
                "." +
                this.state.start_time.getMonth()}
            </Text>
          </TouchableHighlight>
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
          <TouchableHighlight
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
          </TouchableHighlight>
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
          <TouchableHighlight
            onPress={() =>
              this.setState((prevState) => ({
                show_end_date: !prevState.show_end_date,
              }))
            }
          >
            <Text style={[styles.normalText, styles.padding]}>
              {this.state.end_time.getDate() +
                "." +
                this.state.end_time.getMonth()}
            </Text>
          </TouchableHighlight>
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
          <TouchableHighlight
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
          </TouchableHighlight>
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

        <TouchableHighlight
          onPress={() => {
            this.handleSave();
          }}
          style={[{ zIndex: -2, position: "relative" }, styles.buttonPrimary]}
        >
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ChangeTracking;
