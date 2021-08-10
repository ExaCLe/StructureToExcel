import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import * as colors from "./../assets/colors.js";
import * as fonts from "./../assets/fonts/fonts.js";

const styles = (() => {
  console.log("Asking for styles");
  return StyleSheet.create({
    backgroundColor: {
      backgroundColor: colors.BackgroundColor,
      flex: 1,
    },
    fullSize: {
      flex: 1,
    },
    fullHeight: {
      height: "100%",
    },
    tabBar: {
      backgroundColor: global.color,
      paddingTop: 10,
    },
    tabText: {
      fontFamily: fonts.tabBarFont,
    },
    flex: {
      display: "flex",
    },
    columnSize: {
      width: "30%",
    },
    header: {
      backgroundColor: global.color,
    },
    paddingBottom: {
      paddingBottom: 10,
    },
    headerText: {
      fontFamily: fonts.headerFont,
      color: colors.PrimaryTextColor,
    },
    buttonPrimary: {
      backgroundColor: global.color,
      alignSelf: "center",
      width: "80%",
      paddingTop: 25,
      paddingBottom: 20,
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      marginBottom: 20,
      shadowColor: "grey",
      shadowRadius: 1,
      shadowOpacity: 0.3,
      elevation: 6,
      shadowOffset: { width: 5, height: 5 },
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      width: "80%",
      height: "40%",
      backgroundColor: "white",
      borderRadius: 20,
    },
    smallPrimaryButton: {
      textAlign: "center",
      backgroundColor: global.color,
      alignSelf: "center",
      width: "95%",
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      marginBottom: 10,
      shadowColor: "grey",
      shadowRadius: 1,
      shadowOpacity: 0.3,
      elevation: 6,
      shadowOffset: { width: 5, height: 5 },
    },
    primaryButtonText: {
      fontFamily: fonts.primaryFont,
      fontSize: 24,
      color: colors.PrimaryTextColor,
      textAlign: "center",
    },
    primaryAccentColor: {
      color: global.color,
    },
    normalText: {
      fontSize: 24,
      fontFamily: fonts.primaryFont,
    },
    primaryText: {
      fontSize: 24,
      fontFamily: fonts.primaryFont,
      color: colors.PrimaryAccentColor,
      padding: 10,
    },
    secondaryText: {
      fontSize: 20,
      fontFamily: fonts.primaryFont,
      color: colors.SecondaryTextColor,
    },
    paragraph: {
      fontSize: 20,
      fontFamily: fonts.primaryFont,
      color: colors.SecondaryTextColor,
    },
    h1: {
      fontSize: 20,
      fontFamily: fonts.headerFont,
      color: colors.PrimaryAccentColor,
      width: "100%",
      marginBottom: 10,
      marginTop: 10,
    },
    habitContainer: {
      height: 75,
      marginBottom: 10,
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      borderRadius: 10,
      justifyContent: "center",
      backgroundColor: global.color,
      shadowColor: "grey",
      shadowRadius: 1,
      shadowOpacity: 0.3,
      elevation: 6,
      shadowOffset: { width: 5, height: 5 },
    },
    primaryTextColor: {
      color: colors.PrimaryTextColor,
    },
    textButton: {
      fontFamily: fonts.primaryFont,
      color: global.color,
      fontSize: 20,
      textDecorationLine: "underline",
    },
    fullSize: {
      width: "70%",
    },

    containerHorizontalStats: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    containerHorizontal: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    paragraphContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      margin: 10,
    },
    marginBottom: {
      marginBottom: 15,
    },
    spaceAround: {
      justifyContent: "space-around",
    },
    spaceBetween: {
      justifyContent: "space-between",
    },
    margin: {
      marginTop: 10,
      marginBottom: 10,
      marginRight: 10,
      marginLeft: 10,
    },
    textInputLarge: {
      borderWidth: 1,
      borderColor: global.color,
      borderRadius: 10,
      paddingLeft: 20,
    },
    textCenter: {
      textAlign: "center",
    },

    accentColorText: {
      color: global.color,
    },
    textInput: {
      borderWidth: 1,
      borderColor: global.color,
      borderRadius: 10,
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    padding: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 5,
      paddingLeft: 5,
    },
    divider: {
      height: 1,
      backgroundColor: colors.PrimaryAccentColor,
    },
    text: {
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: 20,
    },
    button: {
      backgroundColor: "#aaaaaa",
      marginRight: 5,
      borderRadius: 10,
    },
    blue: {
      color: "blue",
    },
    veryBigText: {
      fontSize: 100,
    },
    container2: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
    },
    flexContainer: {
      display: "flex",
    },
    center: {
      alignSelf: "center",
    },
    textSmall: {
      fontSize: 20,
    },
    textVerySmall: {
      fontSize: 20,
    },
    textBig: {
      fontSize: 30,
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    buttonTopBar: {
      marginRight: 10,
    },
    quote: {
      fontSize: 20,
    },
    quoteAppend: {
      fontSize: 10,
    },
    image: {
      width: "100%",
      height: "75%",
      resizeMode: "contain",
    },
  });
})();

export default styles;
