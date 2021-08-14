import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import TextButton from "./TextButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "../../assets/colors.js";

const AktivityRow = (props) => {
  return (
    <View style={styles.containerHorizontal}>
      <Text style={[styles.secondaryText, styles.columnSize]}>Aktivity: </Text>
      {!!props.name && (
        <View style={styles.containerHorizontal}>
          <Ionicons name={props.icon} size={25} color={global.color} />
          <Text
            style={[
              styles.normalText,
              styles.padding,
              styles.margin,
              { color: global.color },
            ]}
          >
            {props.name}
          </Text>
        </View>
      )}
      <TextButton
        text="Ändere Aktivität"
        onPress={() => {
          props.onPress();
        }}
      />
    </View>
  );
};

export default AktivityRow;
