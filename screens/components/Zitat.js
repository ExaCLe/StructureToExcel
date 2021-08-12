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
import * as fonts from "./../../assets/fonts/fonts.js";

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
          style={[
            styles.image,
            styles.marginBottom,
            {
              borderRadius: 100,
              height: 200,
              width: 200,
              resizeMode: "cover",
              overflow: "hidden",
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 40,
            },
          ]}
          source={selectImage(props.from)}
        />
      </View>

      <View style={{ alignSelf: "center", marginTop: 10 }}>
        <Text
          style={[
            styles.quote,
            {
              color: colors.PrimaryTextColor,
              textAlign: "center",
              paddingLeft: 15,
              paddingRight: 15,
              fontFamily: fonts.primaryFont,
              fontSize: 40,
              shadowColor: "black",
              shadowRadius: 1,
              shadowOpacity: 1,
              elevation: 100,
              shadowOffset: { width: 3, height: 3 },
            },
          ]}
        >
          "{props.quote}"
        </Text>
        <Text
          style={
            (styles.quoteAppend,
            {
              color: colors.PrimaryTextColor,
              textAlign: "center",
              fontFamily: fonts.primaryFont,
              fontSize: 20,
              shadowColor: "black",
              shadowRadius: 1,
              shadowOpacity: 1,
              elevation: 6,
              shadowOffset: { width: 3, height: 3 },
            })
          }
        >
          ~ {props.from}
        </Text>
      </View>
    </View>
  );
};

export default Zitat;
