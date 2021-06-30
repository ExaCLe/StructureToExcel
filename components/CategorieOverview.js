import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import styles from "./styles.js";

const CategorieOverview = (props) => {
  return (
    <View style={[styles.margin, styles.flexContainer]}>
      <Text style={[styles.secondaryText, styles.center, styles.marginBottom]}>
        Wähle eine Kategorie:
      </Text>
      <TouchableHighlight
        style={[styles.buttonPrimary]}
        onPress={() => props.navigation.navigate("Categorie")}
      >
        <Text style={styles.primaryButtonText}>Motivation</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.buttonPrimary]}
        onPress={() => props.navigation.navigate("Categorie")}
      >
        <Text style={styles.primaryButtonText}>Inspiration</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.buttonPrimary]}
        onPress={() => props.navigation.navigate("Categorie")}
      >
        <Text style={styles.primaryButtonText}>Klassiker</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CategorieOverview;
