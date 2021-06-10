import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
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
  container2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  textSmall: {
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
