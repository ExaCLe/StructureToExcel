import React, { useState } from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import Constants from "expo-constants";

import Zitat from "./Zitat.js";
import Quotes from "../assets/Quotes.js";

const QuotesCategorie = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Zitat {...Quotes[count]} />

      <Button
        title="Nächstes Zitat"
        onPress={() => {
          if (count + 1 === Quotes.length) setCount(0);
          else setCount(count + 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
});

export default QuotesCategorie;
