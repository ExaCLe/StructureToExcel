import React, { useState } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import Constants from "expo-constants";
import styles from "./styles.js";

import Zitat from "./Zitat.js";
import Quotes from "../assets/Quotes.js";

const QuotesCategorie = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={[styles.margin, styles.flexContainer, styles.spaceAround]}>
      <Zitat {...Quotes[count]} />
      <TouchableHighlight
        style={styles.buttonPrimary}
        onPress={() => {
          if (count + 1 === Quotes.length) setCount(0);
          else setCount(count + 1);
        }}
      >
        <Text style={styles.primaryButtonText}>Nächstes Zitat</Text>
      </TouchableHighlight>
    </View>
  );
};

export default QuotesCategorie;
