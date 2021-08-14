import React from "react";
import { View } from "react-native";
import styles from "./styles.js";
import PrimaryButton from "./components/PrimaryButton.js";
import Parse from "parse/react-native";
import BackButton from "./components/BackButton.js";
import TextfieldAndLabel from "./components/TextfieldAndLabel.js";
import TextButton from "./components/TextButton.js";

const CONNECTING = "connecting";
const WAITING = "waiting";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      register: false,
      state: WAITING,
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Login",
      headerLeft: () => {
        return <BackButton onPress={() => this.props.navigation.goBack()} />;
      },
    });
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({
      title: this.state.register ? "Registrieren" : "Login",
    });
  }
  checkEntry = () => {
    if (!this.state.user) {
      alert("Bitte Username angeben");
      return false;
    } else if (this.state.password === "" || this.state.password === null)
      return false;
  };
  logIn = async () => {
    if (!this.checkEntry()) return;
    if (this.state === CONNECTING) return;
    this.setState({ state: CONNECTING });
    try {
      await Parse.User.logIn(this.state.username, this.state.password);
      this.props.navigation.navigate("Settings", { synchronize: true });
    } catch (error) {
      this.setState({ state: WAITING });
      alert(error);
    }
  };
  register = async () => {
    if (!this.checkEntry()) return;
    if (this.state === CONNECTING) return;
    this.setState({ state: CONNECTING });
    try {
      const created_user = await Parse.User.signUp(
        this.state.username,
        this.state.password
      );
      this.props.navigation.navigate("Settings", { synchronize: true });
    } catch (error) {
      this.setState({ state: WAITING });
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
          style={styles.topDownMargin}
        />
        <TextfieldAndLabel
          secureTextEntry={true}
          label="Password:"
          onChangeText={(password) => {
            this.setState({ password: password });
          }}
          width="50%"
          style={styles.topDownMargin}
        />
        <PrimaryButton
          text={this.state.register ? "Registrieren" : "Login"}
          onPress={() => {
            if (this.state.register) this.register();
            else this.logIn();
          }}
          style={styles.topDownMargin}
        />
        <TextButton
          text={this.state.register ? "Login" : "Registrieren"}
          onPress={() => {
            this.setState((prevState) => ({ register: !prevState.register }));
          }}
          style={[styles.topDownMargin, { alignSelf: "center" }]}
        />
      </View>
    );
  }
}

export default Settings;
