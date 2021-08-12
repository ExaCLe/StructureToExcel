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
import icons from "../assets/icons.js";
import BackButton from "./components/BackButton.js";

class IconChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => {
        return (
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        );
      },
    });
  }
  renderHeader = ({ section: { title } }) => {
    return <Text style={[styles.secondaryText, styles.padding]}>{title}</Text>;
  };
  renderSectionListItem = ({ item }) => {
    return <FlatList data={item} numColumns={7} renderItem={this.renderItem} />;
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
          <Ionicons name={obj.item.name} size={50} color={global.color} />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View
        style={[
          styles.mainContainer,
          {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <SectionList
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          keyExtractor={(item, index) => index}
          sections={icons}
          renderItem={this.renderSectionListItem}
          renderSectionHeader={this.renderHeader}
          numColumns={7}
        />
      </View>
    );
  }
}

export default IconChooser;
