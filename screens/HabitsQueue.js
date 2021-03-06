import React from "react";
import { FlatList, View } from "react-native";
import styles from "./styles.js";
import * as SQLite from "expo-sqlite";
import Habit from "./components/Habit.js";
import BackButton from "./components/BackButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
const db = SQLite.openDatabase("habits.db");

class HabitsQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: null,
    };
    this.fetchData();
  }
  // gets the data for the habits out of the database
  fetchData = () => {
    console.log("Fetching data for queue...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM habits WHERE queue = 1",
        null,
        (txObj, { rows: { _array } }) => {
          this.setState({ habits: _array });
        },
        () => console.error("Fehler beim Lesen der Gewohnheiten. ")
      );
    });
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      "focus",
      (payload) => {
        this.fetchData();
      }
    );
    this.props.navigation.setOptions({
      title: "Warteschlange",
      headerLeft: () => {
        return (
          <BackButton
            onPress={() => {
              this.props.navigation.navigate("HabitOverview");
            }}
          />
        );
      },
      headerRight: () => (
        <View style={styles.container}>
          <HeaderIcon
            name="add"
            onPress={() =>
              this.props.navigation.navigate("ChangeHabit", {
                edit: false,
              })
            }
          />
        </View>
      ),
    });
  }

  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <Habit habit={obj.item} queue={true} navigation={this.props.navigation} />
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.habits}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    );
  }
}

export default HabitsQueue;
