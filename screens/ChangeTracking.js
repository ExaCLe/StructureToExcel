import React from "react";
import {
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as SQLite from "expo-sqlite";
import styles from "./styles.js";
import PrimaryButton from "./components/PrimaryButton.js";
import BackButton from "./components/BackButton.js";
import AktivityRow from "./components/AktivityRow.js";
import TimeAndDatePicker from "./components/TimeAndDatePicker.js";

const db = SQLite.openDatabase("aktivitys.db");

class ChangeTracking extends React.Component {
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
          this.props.navigation.navigate("AktivityList");
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
      start_time: currentDate,
      change: true,
    });
  };
  onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.start_time;
    this.setState({
      start_time: currentDate,
      change: true,
    });
  };
  onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.end_time;
    this.setState({
      end_time: currentDate,
      change: true,
    });
  };
  onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.end_time;
    this.setState({
      end_time: currentDate,
      change: true,
    });
  };

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <AktivityRow
          onPress={() => {
            this.props.navigation.navigate("AktivityChooser", {
              targetAktivity: "ChangeTracking",
            });
          }}
          icon={this.state.icon}
          name={this.state.name}
        />
        <TimeAndDatePicker
          label="Startzeit:"
          time={this.state.start_time}
          maxTime={this.state.end_time}
          onChangeDate={this.onChangeStartDate}
          onChangeTime={this.onChangeStartTime}
        />
        <TimeAndDatePicker
          label="Endzeit"
          time={this.state.end_time}
          onChangeDate={this.onChangeEndDate}
          onChangeTime={this.onChangeEndTime}
          minTime={this.state.start_time}
        />
        <PrimaryButton
          text={"Speichern"}
          onPress={() => {
            this.handleSave();
          }}
          style={styles.topDownMargin}
        />
      </ScrollView>
    );
  }
}

export default ChangeTracking;
