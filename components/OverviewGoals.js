import React from "react";
import { Text, View, Button, TouchableHighlight, FlatList } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
import Goal from "./Goal.js";
const DAY = "day";
const MONTH = "month";
const WEEK = "week";
class OverviewGoals extends React.Component {
  state = { goals: [{ fullfilled: true, name: "test" }], period: DAY };
  componentDidMount() {
    this.props.navigation.setOptions({
      title: (() => {
        if (this.state.period === DAY) return "Zielübersicht Tag";
        else if (this.state.period === WEEK) return "Zielübersicht Woche";
        else return "Zielübersicht Monat";
      })(),
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
  componentDidUpdate() {
    this.props.navigation.setOptions({
      title: (() => {
        if (this.state.period === DAY) return "Zielübersicht Tag";
        else if (this.state.period === WEEK) return "Zielübersicht Woche";
        else return "Zielübersicht Monat";
      })(),
    });
  }
  // changes the view to DAY, WEEK or MONTH given by the argument
  changeView = (view) => {
    this.setState({ period: view });
  };
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return <Goal goal={obj.item} navigation={this.props.navigation} />;
  };
  render() {
    const changeView = this.changeView;
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
            if (this.state.period === DAY) changeView(WEEK);
            else changeView(DAY);
          }}
        >
          <Text style={styles.primaryButtonText}>
            {this.state.period === DAY ? "Wochenübersicht" : "Tagesübersicht"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() => {
            if (this.state.period === MONTH) changeView(WEEK);
            else changeView(MONTH);
          }}
        >
          <Text style={styles.primaryButtonText}>
            {this.state.period === MONTH
              ? "Wochenübersicht"
              : "Monatsübersicht"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default OverviewGoals;
