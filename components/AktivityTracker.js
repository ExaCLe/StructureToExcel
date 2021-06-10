import React from "react";
import { Text, TouchableHighlight, View } from "react-native";

class AktivityTracker extends React.Component {
  render() {
    return (
      <View>
        <Text>Lesen</Text>
        <TouchableHighlight>
          <Text>Start</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AktivityTracker;
