import React from "react";
import { Button, TouchableHighlight, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HabitOverview from "./components/HabitOverview.js";
import ChangeHabit from "./components/ChangeHabit.js";
import CategorieOverview from "./components/CategorieOverview.js";
import QuotesCategorie from "./components/QuotesCategorie";
import HabitsDetails from "./components/HabitsDetails.js";
import EditHabit from "./components/EditHabit.js";
import TrackingOverview from "./components/TrackingOverview.js";
import PomodoroTimer from "./components/PomodoroTimer.js";
import MonthlyOverviewGoals from "./components/MonthlyOverviewGoals.js";
import HabitsQueue from "./components/HabitsQueue.js";
import PomodoroSettings from "./components/PomodoroSettings.js";
import DailyOverviewGoals from "./components/DailyOverviewGoals.js";
import WeeklyOverviewGoals from "./components/WeeklyOverviewGoals.js";
import AddGoal from "./components/AddGoals.js";
import AddAktivity from "./components/AddAktivity.js";
import EditAktivity from "./components/EditAktivity.js";
import { useFonts } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import * as colors from "./assets/colors.js";
import styles from "./components/styles.js";

const StackHabits = createStackNavigator();

const StackQuotes = createStackNavigator();

const Tab = createBottomTabNavigator();

const StackPomodoro = createStackNavigator();

const StackGoals = createStackNavigator();

const StackTracking = createStackNavigator();

function Habit() {
  let [fontsLoaded] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratThin: require("./assets/fonts/Montserrat-Thin.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <StackHabits.Navigator>
      <StackHabits.Screen
        name="HabitOverview"
        component={HabitOverview}
        options={{
          title: "Gewohnheiten Übersicht",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="ChangeHabit"
        component={ChangeHabit}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="HabitDetails"
        component={HabitsDetails}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackHabits.Screen
        name="HabitsQueue"
        component={HabitsQueue}
        options={{
          headerStyle: styles.header,
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
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackQuotes.Screen
        name="Categorie"
        component={QuotesCategorie}
        options={{
          title: "Categorie",
          headerStyle: styles.header,
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
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackPomodoro.Screen
        name="PomodoroSettings"
        component={PomodoroSettings}
        options={{
          title: "Pomodoro Settings",
          headerStyle: styles.header,
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
        name="MonthlyOverviewGoals"
        component={MonthlyOverviewGoals}
        options={{
          title: "Zielübersicht Monat",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="WeeklyOverviewGoals"
        component={WeeklyOverviewGoals}
        options={{
          title: "Zielübersicht Woche",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="DailyOverviewGoals"
        component={DailyOverviewGoals}
        options={{
          title: "Zielübersicht Tag",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen
        name="AddGoal"
        component={AddGoal}
        options={{
          title: "Ziel hinzufügen",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackGoals.Screen name="EditGoal" component="EditGoal" />
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
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen
        name="AddAktivity"
        component={AddAktivity}
        options={{
          title: "Aktivität hinzufügen",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
        }}
      />
      <StackTracking.Screen name="EditAktivity" component={EditAktivity} />
    </StackTracking.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
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
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.PrimaryTextColor,
          inactiveTintColor: colors.NavigationInactiveItem,
          labelStyle: styles.tabText,
          style: styles.tabBar,
        }}
      >
        <Tab.Screen name="Habits" component={Habit} />
        <Tab.Screen name="Pomodoro" component={Pomodoro} />
        <Tab.Screen name="Goals" component={Goals} />
        <Tab.Screen name="Quotes" component={Quotes} />
        <Tab.Screen name="Tracking" component={Tracking} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
