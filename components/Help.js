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
    if (screen === "aktivities") {
      elements = (
        <View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Aktivitäten tracken.</Text>
            <Text style={styles.paragraph}>
              Hier kannst du verfolgen wie viel Zeit du mit den
              unterschiedlichen Tätigkeiten verbringst.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Hinzufügen</Text>
            <Text style={styles.paragraph}>
              Neue Aktivitäten kannst du über das{" "}
              <Ionicons
                name="add"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              Symbol hinzufügen. Dabei hast du die Möglichkeit einen Namen zu
              vergeben und ein Icon auszuwählen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Warum ist dies sinnvoll?</Text>
            <Text style={styles.paragraph}>
              Dies kann sinnvoll sein, um bewusster mit deiner Zeit umzugehen
              oder um deine täglichen Arbeitsziele nicht mehr output sondern
              input-basiert zu gestalten und so stressfreier durch die Woche zu
              gelangen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Bearbeiten der Aktivität</Text>
            <Text style={styles.paragraph}>
              Öffne dazu einfach die Details indem du die Aktivität anklickst
              und dann kannst du über
              <Ionicons
                name="pencil"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              dieses Symbol in dem Bearbeitungsmodus gelangen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Löschen der Aktivität</Text>
            <Text style={styles.paragraph}>
              Öffne dazu einfach die Details indem du die Aktivität anklickst
              und dann kannst du über
              <Ionicons
                name="trash"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              dieses Symbol die Aktivität löschen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Starten einer Aufzeichnung</Text>
            <Text style={styles.paragraph}>
              Tippe dazu einfach das Symbol
              <Ionicons
                name="play"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              an.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>
              Stoppen und Speichern einer Aufzeichnung
            </Text>
            <Text style={styles.paragraph}>
              Tippe dazu einfach das Symbol
              <Ionicons
                name="stop"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              an.
            </Text>
          </View>
        </View>
      );
    } else if (screen === "tracking") {
      elements = (
        <View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Trackings</Text>
            <Text style={styles.paragraph}>
              Hier sind alle Aufzeichungen deiner Aktivitäten eingetragen. Du
              kannst sie bearbeiten, ansehen, löschen oder ganz neue Einträge
              einfügen.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Hinzufügen</Text>
            <Text style={styles.paragraph}>
              Neue Ziele kannst du über das{" "}
              <Ionicons
                name="add"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              Symbol hinzufügen. Hierbei musst du dann noche die zugehörige
              Aktivität auswählen und dann noch den Start und Entzeitpunkt des
              Eintrages bestimmen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Bearbeiten</Text>
            <Text style={styles.paragraph}>
              Um einen Eintrag zu bearbeiten musst du ihn einfach antippen und
              dann in den Bearbeitunsmodus über das Symbol
              <Ionicons
                name="pencil"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              oben rechts wechseln. Hier kannst du dann die zugehörige
              Aktivität, den Start- und Endzeitpunkt festlegen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Löschen des Eintrages</Text>
            <Text style={styles.paragraph}>
              Tippe dazu einfach den Eintrag an, um die Details zu sehen und
              tippe dann auf das Symbol
              <Ionicons
                name="trash"
                size={25}
                color={colors.SecondaryTextColor}
              />
              .
            </Text>
          </View>
        </View>
      );
    } else if (screen === "goals") {
      elements = (
        <View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Ziele</Text>
            <Text style={styles.paragraph}>
              Hier kannst du Ziele hinzufügen und deinen Fortschritt bei der
              Erfüllung verfolgen.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Hinzufügen</Text>
            <Text style={styles.paragraph}>
              Neue Ziele kannst du über das{" "}
              <Ionicons
                name="add"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              Symbol hinzufügen. Dabei hast du die Möglichkeit einen Namen zu
              vergeben, wie oft du das Ziel erfüllen möchtest und ein Icon
              auswählen. Des Weiteren kannst du eine Priorität festlegen, die du
              später daran erkennen kannst, dass sich die Einträge des Ziels
              anders einfärben.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Updaten des Fortschritts</Text>
            <Text style={styles.paragraph}>
              Wenn du bei einem Ziel Fortschritt erzielt hast, dann kannst du
              diesen über das Symbol
              <Ionicons
                name="add"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              hinzufügen. Falls du einen größeren Fortschritt gemacht hast oder
              falls du deinen Fortschritt zurücksetzen möchtest, dann kannst du
              dies beim Bearbeiten des Ziel machen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Bearbeiten des Ziels</Text>
            <Text style={styles.paragraph}>
              Öffne dazu einfach die Details indem du das Ziel anklickst und
              dann kannst du über
              <Ionicons
                name="pencil"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              dieses Symbol in dem Bearbeitungsmodus gelangen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Löschen des Ziels</Text>
            <Text style={styles.paragraph}>
              Öffne dazu einfach die Details indem du das Ziel anklickst und
              dann kannst du über
              <Ionicons
                name="trash"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              dieses Symbol das Ziel löschen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Ansicht Wechseln</Text>
            <Text style={styles.paragraph}>
              Je nachdem welches Intervall du gewählt hast, musst die die
              Ansicht der Ziele wechseln, damit dein Ziel sichtbar ist. Drücke
              dazu einfach einen der Buttons über der unteren Navigationsleiste,
              wenn du in einer Übersicht bist, um ein anderes Intervall
              auszuwählen.
            </Text>
          </View>
          <View style={styles.paragraphContainer}>
            <Text style={styles.h1}>Zeitziele</Text>
            <Text style={styles.paragraph}>
              Du kannst auch Zeitziele anlegen, wobei du hier dann den
              Fortschritt mithilfe des Trackens im Tracking-Tab verfolgen
              kannst.
            </Text>
            <Text style={styles.paragraph}>
              Du musst dann eine Aktivität erstellen und das Ziel dann damit
              verbinden. Beispielsweise könntest du dir das Ziel setzen, jede
              Woche 10 Stunden zu lesen.
            </Text>
            <Text style={styles.paragraph}>
              Dafür musst du dann beim Erstellen des Ziel, den Slider für das
              Zeitziel aktivieren und dann eine Aktivität auswählen (in diesem
              Beispiel Lesen.) Falls du noch keine Aktivität hast, kannst du
              auch direkt über das
              <Ionicons
                name="add"
                size={25}
                color={colors.SecondaryTextColor}
              />{" "}
              Symbol eine erstellen.
            </Text>
          </View>
        </View>
      );
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
      <ScrollView
        style={[
          { flex: 1 },
          styles.padding,
          styles.margin,
          { marginBottom: 0 },
        ]}
      >
        {elements}
      </ScrollView>
    );
  }
}

export default Help;
