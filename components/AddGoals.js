import React from "react";
import { Text, View, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
class AddGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open1: false,
      open2: false,
      value1: 1,
      vale2: 1,
      items1: [
        { id: 1, title: "Priorität 1", val: 1 },
        { id: 2, title: "Priorität 2", val: 2 },
        { id: 3, title: "Priorität 3", val: 3 },
      ],

      items2: [
        { id: 1, title: "Woche", val: 1 },
        { id: 2, title: "Tag", val: 2 },
        { id: 3, title: "Monat", val: 3 },
      ],
    };
  }
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

  setOpen1 = (open1) => {
    this.setState({ open1 });
  };

  setOpen2 = (open2) => {
    this.setState({ open2 });
  };

  setValue1 = (callback) => {
    this.setState((state) => ({
      value1: callback(state.value1),
    }));
  };

  setValue2 = (callback) => {
    this.setState((state) => ({
      value2: callback(state.value2),
    }));
  };

  render() {
    return (
      <View style={styles.margin}>
        <View style={styles.containerHorizontal}>
          <Text style={styles.secondaryText}>Name: </Text>
          <TextInput
            placeholder="Name"
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
          />
        </View>

        <View style={[styles.containerHorizontal]}>
          <Text style={[styles.secondaryText, styles.margin]}>Icon: </Text>
          <Ionicons
            name="book-outline"
            size={25}
            color={colors.PrimaryAccentColor}
            style={[styles.margin, styles.padding]}
          />
        </View>
        <View style={styles.containerHorizontal}>
          <Text style={styles.secondaryText}>Intervall: </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.open2}
            value={this.state.value2}
            items={this.state.items2}
            setOpen={this.setOpen2}
            setValue={this.setValue2}
            style={[styles.dropdown, styles.margin, styles.fullSize]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={1000}
          />
        </View>

        <View style={styles.containerHorizontal}>
          <Text style={styles.secondaryText}>Priorität: </Text>
          <DropDownPicker
            schema={{
              label: "title",
              value: "val",
            }}
            open={this.state.open1}
            value={this.state.value1}
            items={this.state.items1}
            setOpen={this.setOpen1}
            setValue={this.setValue1}
            style={[styles.dropdown, styles.margin, styles.fullSize]}
            dropDownContainerStyle={[styles.dropdownMenu, styles.margin]}
            textStyle={[styles.normalText, styles.accentColorText]}
            zIndex={1000}
          />
        </View>
        <View style={[styles.containerHorizontal, styles.center]}>
          <TextInput
            placeholder="6"
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
          />
          <Text style={styles.secondaryText}>von</Text>
          <TextInput
            placeholder="12"
            style={[
              styles.padding,
              styles.textInputSmall,
              styles.margin,
              styles.normalText,
              styles.accentColorText,
            ]}
          />
        </View>
        <TouchableHighlight style={styles.buttonPrimary}>
          <Text style={styles.primaryButtonText}>Speichern</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AddGoal;
