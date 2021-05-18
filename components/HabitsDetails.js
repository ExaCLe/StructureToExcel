import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("habits.db");

const HabitsDetails = (props) => {
  useEffect(() => {
    // add the button to the top
    props.navigation.setOptions({
      title: props.route.params.name,
      headerRight: () => (
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.buttonTopBar}
            onPress={() => {
              props.navigation.navigate("EditHabit", props.route.params);
            }}
          >
            <Ionicons name="pencil" size={25} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonTopBar}
            underlayColor="#ffffff"
            onPress={() => {
              db.transaction((tx) => {
                tx.executeSql(
                  "DELETE FROM habits WHERE id=?",
                  [props.route.params.id],
                  () => {
                    props.navigation.goBack();
                  },
                  null
                );
              });
            }}
          >
            <Ionicons name="trash" size={25} />
          </TouchableHighlight>
        </View>
      ),
    });
  }, null);
  return (
    <View style={styles.container}>
      <Text style={styles.textSmall}>Name: </Text>
      <Text style={styles.textBig}>{props.route.params.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flex: 1,
  },
  textSmall: {
    fontSize: 20,
  },
  textBig: {
    fontSize: 40,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  buttonTopBar: {
    marginRight: 10,
  },
});

export default HabitsDetails;
