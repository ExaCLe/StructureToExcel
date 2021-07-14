import React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
} from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../assets/colors.js";
class AddAktivity extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={styles.margin}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={colors.PrimaryTextColor}
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
  }
  render() {
    return (
      <View style={styles.margin}>
        <Text style={[styles.secondaryText]}>Name: </Text>
        <TextInput
          placeholder="Name"
          style={[styles.normalText, styles.textInputLarge, styles.padding]}
        />
        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Icon: </Text>
          <Ionicons
            name="book-outline"
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
          <TouchableHighlight style={[styles.margin, styles.padding]}>
            <Text style={[styles.textButton]}> Wähle Icon</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={[styles.buttonPrimary]}>
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AddAktivity;
