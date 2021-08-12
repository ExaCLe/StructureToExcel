import React from "react";
import { View } from "react-native";
import styles from "./styles.js";
import PrimaryButton from "./components/PrimaryButton.js";
import Parse from "parse/react-native";
import BackButton from "./components/BackButton.js";
import TextfieldAndLabel from "./components/TextfieldAndLabel.js";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => {
        return <BackButton onPress={() => this.props.navigation.goBack()} />;
      },
    });
  }
  logIn = async () => {
    try {
      await Parse.User.logIn(this.state.username, this.state.password);
      this.props.navigation.navigate("Settings", { synchronize: true });
    } catch (error) {
      alert(error);
    }
  };
  register = async () => {
    try {
      const created_user = await Parse.User.signUp(
        this.state.username,
        this.state.password
      );
      this.props.navigation.navigate("Settings", { synchronize: true });
    } catch (error) {
      alert(error);
      console.log("Error when registering: ", error);
    }
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <TextfieldAndLabel
          label="Username:"
          onChangeText={(username) => {
            this.setState({ username: username });
          }}
          width="50%"
          labelWidth="10%"
        />
        <TextfieldAndLabel
          secureTextEntry={true}
          label="Password:"
          onChangeText={(password) => {
            this.setState({ password: password });
          }}
          width="50%"
          labelWidth="10%"
        />
        <PrimaryButton
          text={"Login"}
          onPress={() => {
            this.logIn();
          }}
        />
        <PrimaryButton
          text={"Registrieren"}
          onPress={() => {
            this.register();
          }}
        />
      </View>
    );
  }
}

export default Settings;
