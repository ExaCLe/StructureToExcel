import React from "react";
import { Button, StatusBar, TouchableHighlight, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HabitOverview from "./HabitOverview.js";
import ChangeHabit from "./ChangeHabit.js";
import CategorieOverview from "./CategorieOverview.js";
import QuotesCategorie from "./QuotesCategorie";
import HabitsDetails from "./HabitsDetails.js";
import TrackingOverview from "./TrackingOverview.js";
import PomodoroTimer from "./PomodoroTimer.js";
import HabitsQueue from "./HabitsQueue.js";
import PomodoroSettings from "./PomodoroSettings.js";
import OverviewGoals from "./OverviewGoals.js";
import ChangeGoal from "./ChangeGoal.js";
import ChangeAktivity from "./ChangeAktivity.js";
import GoalsDetails from "./GoalsDetails.js";
import * as colors from "../assets/colors.js";
import styles from "./styles.js";
import * as Font from "expo-font";
import IconChooser from "./IconChooser.js";
import AktivityDetails from "./AktivityDetails.js";
import AktivityList from "./AktivityList.js";
import AktivityListDetails from "./AktivityListDetails.js";
import ChangeTracking from "./ChangeTracking.js";
import AktivityChooser from "./AktivityChooser.js";
import SettingsScreen from "./Settings.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen.js";
import Help from "./Help.js";
import LoadingScreen from "./components/LoadingScreen.js";

const StackHabits = createStackNavigator();

const StackQuotes = createStackNavigator();

const Tab = createBottomTabNavigator();

const StackPomodoro = createStackNavigator();

const StackGoals = createStackNavigator();

const StackTracking = createStackNavigator();

const StackSettings = createStackNavigator();

function Settings() {
  return (
    <StackSettings.Navigator>
      <StackSettings.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackSettings.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
    </StackSettings.Navigator>
  );
}
function Habit() {
  return (
    <StackHabits.Navigator>
      <StackHabits.Screen
        name="HabitOverview"
        component={HabitOverview}
        options={{
          title: "Gewohnheiten Übersicht",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="ChangeHabit"
        component={ChangeHabit}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="HabitDetails"
        component={HabitsDetails}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="HabitsQueue"
        component={HabitsQueue}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="IconChooserHabits"
        component={IconChooser}
        options={{
          title: "Wähle ein Icon",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="Help"
        component={Help}
        options={{
          title: "Hilfe",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
    </StackHabits.Navigator>
  );
}

function Quotes() {
  return (
    <StackQuotes.Navigator>
      <StackQuotes.Screen
        name="ChooseCategorie"
        component={CategorieOverview}
        options={{
          title: "Wähle eine Kategorie",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackQuotes.Screen
        name="Categorie"
        component={QuotesCategorie}
        options={{
          title: "Categorie",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackQuotes.Screen
        name="Help"
        component={Help}
        options={{
          title: "Hilfe",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
    </StackQuotes.Navigator>
  );
}

function Pomodoro() {
  return (
    <StackPomodoro.Navigator>
      <StackPomodoro.Screen
        name="PomoTimer"
        component={PomodoroTimer}
        options={{
          title: "Pomodoro Timer",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackPomodoro.Screen
        name="PomodoroSettings"
        component={PomodoroSettings}
        options={{
          title: "Pomodoro Settings",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackPomodoro.Screen
        name="Help"
        component={Help}
        options={{
          title: "Hilfe",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
    </StackPomodoro.Navigator>
  );
}
function Goals() {
  return (
    <StackGoals.Navigator>
      <StackGoals.Screen
        name="OverviewGoals"
        component={OverviewGoals}
        options={{
          title: "Zielübersicht",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="ChangeGoal"
        component={ChangeGoal}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="GoalsDetails"
        component={GoalsDetails}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="IconChooserGoals"
        component={IconChooser}
        options={{
          title: "Wähle ein Icon",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="AktivityChooserGoal"
        component={AktivityChooser}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="ChangeAktivityGoals"
        component={ChangeAktivity}
        options={{
          title: "Aktivität hinzufügen",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="Help"
        component={Help}
        options={{
          title: "Hilfe",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
    </StackGoals.Navigator>
  );
}
function Tracking() {
  return (
    <StackTracking.Navigator>
      <StackTracking.Screen
        name="TrackingOverview"
        component={TrackingOverview}
        options={{
          title: "Aktivitäten",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="ChangeAktivity"
        component={ChangeAktivity}
        options={{
          title: "Aktivität hinzufügen",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="IconChooserTracking"
        component={IconChooser}
        options={{
          title: "Wähle ein Icon",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="AktivityDetails"
        component={AktivityDetails}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="AktivityList"
        component={AktivityList}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="AktivityListDetails"
        component={AktivityListDetails}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="ChangeTracking"
        component={ChangeTracking}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="AktivityChooser"
        component={AktivityChooser}
        options={{
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="Help"
        component={Help}
        options={{
          title: "Hilfe",
          headerStyle: [styles.header, { backgroundColor: global.color }],
          headerTitleStyle: styles.headerText,
        }}
      />
    </StackTracking.Navigator>
  );
}

export default class App extends React.Component {
  state = { fontsLoaded: false, colorLoaded: false };
  componentDidMount() {
    this.loadFonts();
    this.loadColor();
  }
  loadColor = async () => {
    const value = await (async () => {
      try {
        const value = await AsyncStorage.getItem("color");
        if (value !== null) {
          global.color = value;
          this.setState({ colorLoaded: true });
        } else {
          global.color = "#F00943";
          this.setState({ colorLoaded: true });
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };
  loadFonts = async () => {
    await Font.loadAsync({
      MontserratRegular: require("./../assets/fonts/Montserrat-Regular.ttf"),
      MontserratLight: require("./../assets/fonts/Montserrat-Light.ttf"),
      MontserratThin: require("./../assets/fonts/Montserrat-Thin.ttf"),
      MontserratBold: require("./../assets/fonts/Montserrat-Bold.ttf"),
    });
    this.setState({ fontsLoaded: true });
  };
  render() {
    if (this.state.fontsLoaded && this.state.colorLoaded) {
      return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Habits"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Quotes") {
                  iconName = focused
                    ? "ios-information-circle"
                    : "ios-information-circle-outline";
                  return <Entypo name="quote" size={size} color={color} />;
                } else if (route.name === "Habits") {
                  iconName = focused ? "body-sharp" : "body-outline";
                } else if (route.name === "Pomodoro") {
                  iconName = focused ? "timer-sharp" : "timer-outline";
                } else if (route.name === "Goals") {
                  iconName = focused ? "golf-sharp" : "golf-outline";
                } else if (route.name === "Tracking") {
                  iconName = focused ? "time-sharp" : "time-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings-sharp" : "settings-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: colors.PrimaryTextColor,
              inactiveTintColor: colors.NavigationInactiveItem,
              labelStyle: styles.tabText,
              style: [styles.tabBar, { backgroundColor: global.color }],
              keyboardHidesTabBar: true,
            }}
          >
            <Tab.Screen name="Habits" component={Habit} />
            <Tab.Screen name="Pomodoro" component={Pomodoro} />
            <Tab.Screen name="Goals" component={Goals} />
            <Tab.Screen name="Quotes" component={Quotes} />
            <Tab.Screen name="Tracking" component={Tracking} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else return <LoadingScreen />;
  }
}
