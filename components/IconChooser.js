import React from "react";
import {
  View,
  SectionList,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
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
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        );
      },
    });
  }
  renderHeader = ({ section: { title } }) => {
    return <Text style={[styles.secondaryText, styles.padding]}>{title}</Text>;
  };
  renderSectionListItem = ({ item }) => {
    return <FlatList data={item} numColumns={8} renderItem={this.renderItem} />;
  };
  // renders an habit entry in the flat list
  renderItem = (obj) => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(this.props.route.params.target, {
              icon: obj.item.name,
              changeIcon: true,
            });
          }}
        >
          <Ionicons
            name={obj.item.name}
            size={50}
            color={colors.PrimaryAccentColor}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <SectionList
          keyExtractor={(item, index) => index}
          sections={icons}
          renderItem={this.renderSectionListItem}
          renderSectionHeader={this.renderHeader}
          numColumns={8}
        />
      </View>
    );
  }
}

export default IconChooser;
