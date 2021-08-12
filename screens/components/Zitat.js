import React from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import * as colors from "./../../assets/colors.js";

import styles from "../styles.js";

const selectImages = (name) => {
  if (name === "Harvey Specter")
    return require("../../assets/headshots/HarveySpecter.jpg");
  else if (name === "Jessica Pearson")
    return require("../../assets/headshots/JessicaPearson.jpg");
};

const Zitat = (props) => {
  const selectImage = selectImages;
  return (
    <View
      style={[styles.flexContainer, { backgroundColor: colors, marginTop: 0 }]}
    >
      <View
        style={{
          shadowRadius: 1,
          shadowOpacity: 0.8,
          elevation: 2000,
          shadowOffset: { width: 5, height: 5 },
        }}
      >
        <Image
          style={[styles.image, styles.marginBottom]}
          source={selectImage(props.from)}
        />
      </View>

      <View style={{ alignSelf: "center", marginTop: 10 }}>
        <Text style={[styles.quote]}>"{props.quote}"</Text>
        <Text style={styles.quoteAppend}>~ {props.from}</Text>
      </View>
    </View>
  );
};

export default Zitat;
