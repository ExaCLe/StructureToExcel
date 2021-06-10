import React from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
class WeeklyOverviewGoals extends React.Component {
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
          title={"Tagesübersicht"}
          onPress={() => {
            this.props.navigation.navigate("DailyOverviewGoals");
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

export default WeeklyOverviewGoals;
