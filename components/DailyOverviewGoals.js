import React from "react";
import { Text, View, Button, TouchableHighlight } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
class DailyOverviewGoals extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("AddGoal")}
          >
            <Ionicons name="add" size={25} color={colors.PrimaryTextColor} />
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

export default DailyOverviewGoals;
