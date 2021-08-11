import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles.js";
import * as categories from "../assets/categories.js";
import * as SQLite from "expo-sqlite";
import PrimaryButton from "./components/PrimaryButton.js";
import HeaderIcon from "./components/HeaderIcon.js";
const db = SQLite.openDatabase("favorites.db");

class CategorieOverview extends React.Component {
  constructor(props) {
    super(props);
    // create a table for the habits if not existing already
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS favorites (id INTEGER, categorie TEXT ); ",
        null,
        // success
        () => {},
        // error
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <HeaderIcon
            name="heart"
            onPress={() =>
              this.props.navigation.navigate("Categorie", {
                categorie: categories.FAVORITES,
              })
            }
          />
        </View>
      ),
    });
  }
  render() {
    return (
      <View
        style={[styles.extraMargin, styles.mainContainer, styles.flexContainer]}
      >
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
