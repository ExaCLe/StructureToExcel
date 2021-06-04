import React from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class HabitsQueue extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Warteschlange",
      headerRight: () => (
        <View style={styles.container}>
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
        </View>
      ),
    });
  }
  render() {
    return <Text>HabitsQueue</Text>;
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
});

export default HabitsQueue;
