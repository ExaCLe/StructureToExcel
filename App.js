import React from "react";
import App2 from "./screens/App.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Parse from "parse/react-native";

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(
  "sy6KefxN8AKgzYK8ZU4Rtn7uPQ2MjDRyJ7C8qrvz",
  "YT4CUinkgxjaxC86bjrvjF6CuFANQw0Z7LtIr5zu"
);
Parse.serverURL = "https://parseapi.back4app.com/";
// Parse.initialize("myAppId");
// Parse.serverURL = "https://test-parse-server-for-app.herokuapp.com/parse";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <App2 />;
  }
}
