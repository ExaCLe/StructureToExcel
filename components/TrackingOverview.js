import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import AktivityTracker from "./AktivityTracker.js";
import Ionicons from "react-native-vector-icons/Ionicons";

class TrackingOverview extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("AddAktivity")}
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
        <AktivityTracker />
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
export default TrackingOverview;
