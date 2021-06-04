import React from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
class EditGoal extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons name="trash" size={25} />
          </TouchableHighlight>
        </View>
      ),
    });
  }
  render() {
    return (
      <View>
        <Text>Name: </Text>
        <TextInput placeholder="Name" />
        <Text>Icon: </Text>
        <Button title={"Wähle Icon"} />
        <Text>Intervall: </Text>
        <TextInput placeholder="Woche" />
        <Text>Priorität: </Text>
        <TextInput placeholder="Priorität 1" />
        <TextInput placeholder="6" />
        <Text>von</Text>
        <TextInput placeholder="12" />
        <Button title={"Speichern"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default EditGoal;
