import React, { useRef } from "react";
import { Animated, InteractionManager, View } from "react-native";
import styles from "./../styles";
import * as colors from "./../../assets/colors.js";

const AnimatedBar = (props) => {
  console.log(props.height);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const progressPercent = heightAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });
  React.useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: props.height,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [heightAnim]);
  return (
    <Animated.View
      style={[
        {
          backgroundColor: global.color,
          height: progressPercent,
          borderRadius: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      ]}
    ></Animated.View>
  );
};

export default AnimatedBar;
