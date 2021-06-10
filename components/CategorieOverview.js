import React from "react";
import { View, Button, Text } from "react-native";
import styles from "./styles.js";

const CategorieOverview = (props) => {
  return (
    <View style={styles.container}>
      <Text>Wähle eine Kategorie:</Text>
      <Button
        title={"Motivation"}
        onPress={() => props.navigation.navigate("Categorie")}
      />
      <Button
        title={"Inspiration"}
        onPress={() => props.navigation.navigate("Categorie")}
      />
      <Button
        title={"Klassiker"}
        onPress={() => props.navigation.navigate("Categorie")}
      />
    </View>
  );
};

export default CategorieOverview;
