import React from "react";
import { View, Text } from "react-native";

class EditHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.route.params,
    };
  }

  render() {
    return (
      <View>
        <Text>Name: </Text>
      </View>
    );
  }
}

export default EditHabit;
