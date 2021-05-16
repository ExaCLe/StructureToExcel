import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import Constants from "expo-constants";
import { createSwitchNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import Habit from "./Habit.js";
import Divider from "./Divider.js";

export default class HabitOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCounter: 3,
      habits: [
        {
          name: "Test",
          fullfilled: false,
          id: "1",
        },
        {
          name: "Zahnseide verwenden",
          fullfilled: false,
          id: "2",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          underlayColor="#ffffff"
          onPress={() =>
            this.props.navigation.navigate("AddHabit", {
              addHabit: this.addHabit,
            })
          }
        >
          <Ionicons name="add" size={25} />
        </TouchableHighlight>
      ),
    });
  }

  handleFullfilled = (habit) => {
    const index = this.state.habits.findIndex((ele) => ele === habit);
    this.setState((prevState) => {
      prevState.habits[index].fullfilled = true;
      return { habits: [...prevState.habits] };
    });
  };

  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return <Habit habit={obj.item} handleFullfilled={this.handleFullfilled} />;
  };

  // adds a new habit to the state
  addHabit = (habit) => {
    const newHabit = {
      name: habit.name,
      fullfilled: false,
      id: "" + this.state.idCounter,
    };
    this.setState((prevState) => ({
      idCounter: prevState.idCounter + 1,
      habits: [...prevState.habits, newHabit],
    }));
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={[styles.margin, styles.flex]}>
        <Divider></Divider>
        <FlatList
          data={this.state.habits}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
