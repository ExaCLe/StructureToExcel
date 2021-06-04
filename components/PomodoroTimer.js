import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class PomodoroTimer extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Pomodoro Timer",
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.navigate("PomodoroSettings")}
          >
            <Ionicons name="settings" size={25} />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  render() {
    return (
      <View>
        <Text>50:00</Text>
        <Button title={"Start Timer"} />
        <Button title={"Reset Timer"} />
        <TouchableHighlight>
          <Text>Zu Pausenintervall wechseln</Text>
        </TouchableHighlight>
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

export default PomodoroTimer;
