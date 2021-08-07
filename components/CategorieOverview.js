import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
import * as categories from "./../assets/categories.js";
import * as SQLite from "expo-sqlite";
import PrimaryButton from "./PrimaryButton.js";
const db = SQLite.openDatabase("favorites.db");

class CategorieOverview extends React.Component {
  constructor(props) {
    super(props);
    // create a table for the habits if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE favorites (id INTEGER, categorie TEXT ); ",
        null,
        // success
        () => {
          console.log("success");
        },
        // error
        (txObj, error) => {}
      );
    });
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <TouchableOpacity
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("Categorie", {
                categorie: categories.FAVORITES,
              })
            }
          >
            <Ionicons
              name="heart"
              size={25}
              color={colors.PrimaryTextColor}
              style={styles.padding}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }
  render() {
    return (
      <View style={[styles.margin, styles.flexContainer]}>
        <Text
          style={[styles.secondaryText, styles.center, styles.marginBottom]}
        >
          Wähle eine Kategorie:
        </Text>
        <PrimaryButton
          onPress={() =>
            this.props.navigation.navigate("Categorie", {
              categorie: categories.MOTIVATION,
            })
          }
          text={"Motivation"}
        />
        <PrimaryButton
          onPress={() =>
            this.props.navigation.navigate("Categorie", {
              categorie: categories.INSPIRATION,
            })
          }
          text={"Inspiration"}
        />
        <PrimaryButton
          onPress={() =>
            this.props.navigation.navigate("Categorie", {
              categorie: categories.CLASSIC,
            })
          }
          text={"Klassiker"}
        />
      </View>
    );
  }
}

export default CategorieOverview;
