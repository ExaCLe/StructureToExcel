import React from "react";
import { Text, View, Button, TouchableHighlight, FlatList } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
import Goal from "./Goal.js";
class WeeklyOverviewGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goals: [{ fullfilled: true, name: "test" }] };
  }
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
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
  }
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return <Goal goal={obj.item} navigation={this.props.navigation} />;
  };
  render() {
    return (
      <View>
        <View style={[styles.margin, styles.flex]}>
          <FlatList
            data={this.state.goals}
            renderItem={this.renderItem}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() => {
            this.props.navigation.navigate("DailyOverviewGoals");
          }}
        >
          <Text style={styles.primaryButtonText}>Tagesübersicht</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() => this.props.navigation.navigate("MonthlyOverviewGoals")}
        >
          <Text style={styles.primaryButtonText}>Monatsübersicht</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default WeeklyOverviewGoals;
