import React from "react";
import { Text, View } from "react-native";
import AktivityTracker from "./AktivityTracker.js";

class TrackingOverview extends React.Component {
  render() {
    return (
      <View>
        <AktivityTracker />
      </View>
    );
  }
}

export default TrackingOverview;
