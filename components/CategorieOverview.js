import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import styles from "./styles.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
import * as categories from "./../assets/categories.js";
import * as SQLite from "expo-sqlite";
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
          <TouchableHighlight
            underlayColor="#ffffff"
            onPress={() =>
              this.props.navigation.navigate("Categorie", {
                categorie: categories.FAVORITES,
              })
            }
          >
            <Ionicons name="heart" size={25} color={colors.PrimaryTextColor} />
          </TouchableHighlight>
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
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() =>
            this.props.navigation.navigate("Categorie", {
              categorie: categories.MOTIVATION,
            })
          }
        >
          <Text style={styles.primaryButtonText}>Motivation</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() =>
            this.props.navigation.navigate("Categorie", {
              categorie: categories.INSPIRATION,
            })
          }
        >
          <Text style={styles.primaryButtonText}>Inspiration</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonPrimary]}
          onPress={() =>
            this.props.navigation.navigate("Categorie", {
              categorie: categories.CLASSIC,
            })
          }
        >
          <Text style={styles.primaryButtonText}>Klassiker</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default CategorieOverview;
