import React from "react";
import { Text, TouchableHighlight, View } from "react-native";

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
