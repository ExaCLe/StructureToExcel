import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import * as colors from "./../assets/colors.js";
import * as fonts from "./../assets/fonts/fonts.js";

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: colors.BackgroundColor,
    flex: 1,
  },
  fullSize: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.PrimaryAccentColor,
    paddingTop: 10,
  },
  tabText: {
    fontFamily: fonts.tabBarFont,
  },
  header: {
    backgroundColor: colors.PrimaryAccentColor,
  },
  headerText: {
    fontFamily: fonts.headerFont,
    color: colors.PrimaryTextColor,
  },
  buttonPrimary: {
    backgroundColor: colors.PrimaryAccentColor,
    alignSelf: "center",
    width: "80%",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  primaryButtonText: {
    fontFamily: fonts.primaryFont,
    fontSize: 24,
    color: colors.PrimaryTextColor,
  },
  primaryAccentColor: {
    color: colors.PrimaryAccentColor,
  },
  normalText: {
    fontSize: 24,
    fontFamily: fonts.primaryFont,
  },
  secondaryText: {
    fontSize: 20,
    fontFamily: fonts.primaryFont,
    color: colors.SecondaryTextColor,
  },
  habitContainer: {
    height: 75,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: colors.PrimaryAccentColor,
  },
  primaryTextColor: {
    color: colors.PrimaryTextColor,
  },
  textButton: {
    fontFamily: fonts.primaryFont,
    color: colors.PrimaryAccentColor,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  fullSize: {
    width: "70%",
  },
  containerHorizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    borderColor: colors.PrimaryAccentColor,
    borderRadius: 10,
    paddingLeft: 20,
    minWidth: "50%",
  },
  textCenter: {
    textAlign: "center",
  },

  accentColorText: {
    color: colors.PrimaryAccentColor,
  },
  dropdown: {
    backgroundColor: "transparent",
    width: "30%",
    borderColor: colors.PrimaryAccentColor,
  },
  dropdownMenu: {
    width: "30%",
    borderColor: colors.PrimaryAccentColor,
    backgroundColor: colors.BackgroundColor,
    zIndex: 4,
  },
  textInputSmall: {
    borderWidth: 1,
    borderColor: colors.PrimaryAccentColor,
    borderRadius: 10,
    width: "25%",
    textAlign: "center",
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
    backgroundColor: "#000000",
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
    fontSize: 40,
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

export default styles;
