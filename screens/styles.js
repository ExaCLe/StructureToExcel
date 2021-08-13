import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import * as colors from "../assets/colors.js";
import * as fonts from "../assets/fonts/fonts.js";

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
    mainContainer: {
      margin: 0,
      paddingLeft: 20,
      backgroundColor: colors.BackgroundColor,
      paddingTop: 20,
      paddingRight: 20,
      flex: 1,
    },
    textAlignCenter: {
      textAlign: "center",
    },
    dateTimePicker: { color: colors.PrimaryAccentColor },
    topDownMargin: {
      marginTop: 10,
      marginBottom: 10,
    },
    downMargin: {
      marginBottom: 200,
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
      maxWidth: 190,
    },
    picker: {
      fontFamily: fonts.primaryFont,
      fontSize: 24,
    },
    header: {
      backgroundColor: global.color,
      shadowColor: "black",
      shadowRadius: 1,
      shadowOpacity: 0.3,
      elevation: 6,
      shadowOffset: { width: 5, height: 5 },
    },
    imageBackground: { height: "100%", display: "flex" },
    pomTimer: {
      color: global.color,
      fontSize: 140,
      shadowColor: "black",
      shadowRadius: 1,
      shadowOpacity: 0.1,
      elevation: 3,
      shadowOffset: { width: 5, height: 5 },
    },
    paddingBottom: {
      paddingBottom: 10,
    },
    headerText: {
      fontFamily: fonts.headerFont,
      color: colors.PrimaryTextColor,
    },
    smallDownMargin: {
      marginBottom: 50,
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
      shadowColor: "black",
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
      width: "95%",
      height: "50%",
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "black",
      shadowRadius: 1,
      shadowOpacity: 0.3,
      elevation: 6,
      shadowOffset: { width: 5, height: 5 },
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
      shadowColor: "black",
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
      color: colors.PrimaryAccentColor,
    },
    statsText: {
      fontSize: 18,
      fontFamily: fonts.primaryFont,
    },
    extraMargin: {
      margin: 40,
    },
    statsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
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
      shadowColor: "black",
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
      flexWrap: "wrap",
      maxWidth: 378,
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
    alignItemsCenter: {
      width: "100%",
      display: "flex",
      alignItems: "center",
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
    habitStatEntry: {
      display: "flex",
      alignItems: "center",
    },
    center: {
      alignSelf: "center",
    },
    textSmall: {
      fontSize: 20,
    },
    textVerySmall: {
      fontSize: 10,
      fontFamily: fonts.primaryFont,
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
    quoteAppend: {
      fontSize: 10,
      color: colors.PrimaryTextColor,
      textAlign: "center",
      fontFamily: fonts.primaryFont,
      fontSize: 20,
      shadowColor: "black",
      shadowRadius: 1,
      shadowOpacity: 1,
      elevation: 6,
      shadowOffset: { width: 3, height: 3 },
    },
    image: {
      borderRadius: 100,
      height: 200,
      width: 200,
      resizeMode: "cover",
      overflow: "hidden",
      alignSelf: "flex-end",
      marginRight: 20,
      marginTop: 40,
    },
  });
})();

export default styles;
