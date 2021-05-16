import React from "react";
import { Button, View, TextInput } from "react-native";

class AddHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      addHabit: props.route.params.addHabit,
    };
  }

  // handles the name change in input
  handleNameChange = (text) => {
    this.setState({ name: text });
  };

  render() {
    const addHabit = this.state.addHabit;
    return (
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={this.handleNameChange}
          value={this.state.name}
        />
        <Button
          onPress={() => addHabit({ name: this.state.name })}
          title="Hinzufügen"
        />
      </View>
    );
  }
}

export default AddHabit;
