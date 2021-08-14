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
  switch (name) {
    case "Harvey Specter":
      return require("../../assets/headshots/HarveySpecter.jpg");
    case "Jessica Pearson":
      return require("../../assets/headshots/JessicaPearson.jpg");
    case "Michael Jordan":
      return require("../../assets/headshots/MichaelJordan.jpg");
    case "Winston Churchill":
      return require("../../assets/headshots/WinstonChurchill.jpg");
    case "Walt Disney":
      return require("../../assets/headshots/WaltDisney.jpg");
    case "Will Rogers":
      return require("../../assets/headshots/WillRogers.jpg");
    case "Vince Lombardi":
      return require("../../assets/headshots/VinceLombardi.jpg");
    case "Steve Jobs":
      return require("../../assets/headshots/SteveJobs.jpg");
    case "Rob Siltanen":
      return require("../../assets/headshots/RobSiltanen.jpeg");
    case "Maya Angelou":
      return require("../../assets/headshots/MayaAngelou.jpg");
    case "Johann Wolfgang Von Goethe":
      return require("../../assets/headshots/Goethe.jpg");
    case "Brian Tracy":
      return require("../../assets/headshots/BrianTracy.jpg");
    case "Henry Ford":
      return require("../../assets/headshots/HenryFord.jpg");
    case "Helen Keller":
      return require("../../assets/headshots/HelenKeller.jpg");
    case "Franklin D. Roosevelt":
      return require("../../assets/headshots/FranklinDRoosevelt.jpg");
    case "Albert Einstein":
      return require("../../assets/headshots/AlbertEinstein.jpg");
    case "Zig Ziglar":
      return require("../../assets/headshots/ZigZiglar.jpg");
    case "Theodore Roosevelt":
      return require("../../assets/headshots/TheodoreRoosevelt.jpg");
    case "Nelson Mandela":
      return require("../../assets/headshots/NelsonMandela.jpg");
    case "Eleanor Roosevelt":
      return require("../../assets/headshots/EleanorRoosevelt.jpg");
    case "Oprah Winfrey":
      return require("../../assets/headshots/OprahWinfrey.jpg");
    case "James Cameron":
      return require("../../assets/headshots/JamesCameron.jpg");
    case "Mother Theresa":
      return require("../../assets/headshots/MotherTheresa.jpg");
    case "Benjamin Franklin":
      return require("../../assets/headshots/BenjaminFranklin.jpg");
    case "Aristotele":
      return require("../../assets/headshots/Aristotele.jpg");
    case "Anne Frank":
      return require("../../assets/headshots/AnneFrank.jpg");
    default:
      return require("./../../assets/headshots/unknown.jpg");
  }
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
