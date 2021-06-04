import React from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
class DailyOverviewGoals extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("AddGoal")}
          >
            <Ionicons name="add" size={25} />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  render() {
    return (
      <View>
        <Text>Monatsübersicht</Text>
        <Button
          title={"Wochenübersicht"}
          onPress={() => {
            this.props.navigation.navigate("WeeklyOverviewGoals");
          }}
        />
        <Button
          title={"Monatsübersicht"}
          onPress={() => {
            this.props.navigation.navigate("MonthlyOverviewGoals");
          }}
        />
      </View>
    );
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

export default DailyOverviewGoals;
