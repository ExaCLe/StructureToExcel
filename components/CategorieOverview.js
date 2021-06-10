import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import Constants from "expo-constants";

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

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    display: "flex",
  },
});

export default CategorieOverview;
