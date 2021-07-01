import React, { useState } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import Constants from "expo-constants";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";

import Zitat from "./Zitat.js";
import Quotes from "../assets/Quotes.js";

class QuotesCategorie extends React.Component {
  state = { count: 0 };
  setCount = (number) => {
    this.setState({ count: number });
  };
  componentDidMount() {
    this.props.navigation.setOptions({
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
  render() {
    return (
      <View style={[styles.margin, styles.flexContainer, styles.spaceAround]}>
        <Zitat {...Quotes[this.state.count]} />
        <TouchableHighlight
          style={styles.buttonPrimary}
          onPress={() => {
            if (this.state.count + 1 === Quotes.length) this.setCount(0);
            else this.setCount(this.state.count + 1);
          }}
        >
          <Text style={styles.primaryButtonText}>Nächstes Zitat</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default QuotesCategorie;
