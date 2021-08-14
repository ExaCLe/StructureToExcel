import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles";
import * as colors from "./../../assets/colors.js";
import { extractDate, extractTimeDetailed } from "../../helpers/Time";

// Props: time, onChangeTime(), onChangeDate(), (minTime), (maxTime)
const TimeAndDatePicker = (props) => {
  const [show_date, setShowDate] = useState(false);
  const [show_time, setShowTime] = useState(false);
  console.log("TET", show_date, show_time);
  return (
    <View style={styles.flexContainer}>
      <View style={styles.containerHorizontal}>
        <Text style={[styles.secondaryText, styles.columnSize]}>
          {props.label}
        </Text>
        <TouchableOpacity onPress={() => setShowDate(!show_date)}>
          <Text style={[styles.normalText]}>{extractDate(props.time)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowTime(!show_time)}>
          <Text style={[styles.normalText, styles.padding, styles.margin]}>
            {extractTimeDetailed(props.time)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: "center", minWidth: 400 }}>
        {show_date && (
          <DateTimePicker
            value={props.time}
            mode={"date"}
            is24Hour={true}
            maximumDate={props.maxTime}
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={(event, date) => {
              props.onChangeDate(event, date);
              if (Platform.OS === "android") setShowDate(false);
            }}
            style={styles.dateTimePicker}
            textColor={global.color}
          />
        )}
      </View>

      <View style={{ alignSelf: "center", minWidth: 300 }}>
        {show_time && (
          <DateTimePicker
            testID="startDateTimePicker"
            value={props.time}
            mode={"time"}
            is24Hour={true}
            maximumDate={props.maxTime}
            display={Platform.OS === "ios" ? "spinner" : "clock"}
            onChange={(event, date) => {
              if (Platform.OS === "android") setShowTime(false);
              props.onChangeTime(event, date);
            }}
            minimumDate={props.minTime}
            style={styles.dateTimePicker}
            textColor={global.color}
          />
        )}
      </View>
    </View>
  );
};

export default TimeAndDatePicker;
