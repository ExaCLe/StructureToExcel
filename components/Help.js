import React from "react";
import { Text, View, ScrollView } from "react-native";
import BackButton from "./BackButton";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as colors from "./../assets/colors.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class Help extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => {
        return (
          <BackButton
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        );
      },
    });
  }
  render() {
    const screen = this.props.route.params.screen;
    let elements;
    if (screen === "aktivity") {
      elements = "Aktivity";
    } else if (screen === "tracking") {
      elements = "Tracking";
    } else if (screen === "goals") {
      elements = "Goals";
    } else if (screen === "habits") {
      elements = (
        <View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Gewohnheiten</Text>
            <Text style={styles.paragraph}>
              Hier kannst du Gewohnheiten hinzufügen und dann einmal täglich
              diese erfüllen.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Hinzufügen</Text>
            <Text style={styles.paragraph}>
              Neue Gewohnheiten kannst du über das{" "}
              <Ionicons
                name="add"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              Symbol hinzufügen. Dabei hast du die Möglichkeit einen Namen zu
              vergeben, wie oft du die Gewohnheit erfüllen möchtest und ein Icon
              auswählen. Des Weiteren kannst du eine Priorität festlegen, die du
              später daran erkennen kannst, dass sich die Einträge der
              Gewohnheit anders einfärben.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Warteschlange</Text>
            <Text style={styles.paragraph}>
              Grundsätzlich ist es nicht sinnvoll, alle Gewohnheiten auf einmal
              zu implementieren, weshalb es eine Warteschlange gibt, die
              Gewohnheiten speichern kann, ohne dass du sie erfüllen musst. Du
              kannst die Warteschlane über das Symbol{" "}
              <MaterialIcons
                name="queue"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              erreichen und schon direkt beim erstellen die Gewohnheiten dort
              hinzufügen. Wenn du dann die Gewohnheit richtig implementieren
              möchtest, dann kannst du sie einfach über die Detailansicht zu den
              normalen Gewohnheiten zurodnen.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Detailansicht</Text>
            <Text style={styles.paragraph}>
              Zur Detailansicht einer Gewohnheit gelangst du, indem du sie
              einfach antippst.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Abhaken/Erfüllen</Text>
            <Text style={styles.paragraph}>
              Du kannst Gewohnheiten abhaken, indem du auf das{" "}
              <Ionicons
                name="close-circle-outline"
                size={25}
                color={colors.SecondaryTextColor}
              />
              Symbol rechts neben dem Namen der Gewohnheit klickst.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Nachtragen</Text>
            <Text style={styles.paragraph}>
              Über die Monatsansicht einer Gewohnheit kannst du die Gewohnheiten
              noch bis zu 30 Tage lang nachtragen oder wieder löschen, indem du
              einfach lange auf{" "}
              <Ionicons
                name="close-circle-outline"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              oder{" "}
              <Ionicons
                name="checkmark-circle-outline"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              drückst.
            </Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView style={[{ flex: 1 }, styles.padding, styles.margin]}>
        {elements}
      </ScrollView>
    );
  }
}

export default Help;
