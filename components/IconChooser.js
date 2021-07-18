import React from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import * as colors from "./../assets/colors.js";
import icons from "./../assets/icons.js";

class IconChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                style={styles.padding}
                color={colors.PrimaryTextColor}
              />
            </TouchableHighlight>
          </View>
        );
      },
    });
  }
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate(this.props.route.params.target, {
              icon: obj.item.name,
            });
          }}
        >
          <Ionicons
            name={obj.item.name}
            size={50}
            color={colors.PrimaryAccentColor}
          />
        </TouchableHighlight>
      </View>
    );
  };
  render() {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <FlatList data={icons} renderItem={this.renderItem} numColumns={8} />
      </View>
    );
  }
}

export default IconChooser;
