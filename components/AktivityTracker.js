import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import styles from "./styles.js";

class AktivityTracker extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight>
          <Text>Lesen</Text>
        </TouchableHighlight>

        <TouchableHighlight>
          <Text>Start</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AktivityTracker;
