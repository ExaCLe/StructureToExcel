import React from "react";
import { Button, TouchableHighlight, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HabitOverview from "./components/HabitOverview.js";
import AddHabit from "./components/AddHabit.js";
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

const StackHabits = createStackNavigator();

const StackQuotes = createStackNavigator();

const Tab = createBottomTabNavigator();

const StackPomodoro = createStackNavigator();

const StackGoals = createStackNavigator();

const StackTracking = createStackNavigator();

function Habit() {
  return (
    <StackHabits.Navigator>
      <StackHabits.Screen
        name="HabitOverview"
        component={HabitOverview}
        options={{ title: "Gewohnheiten Übersicht" }}
      />
      <StackHabits.Screen
        name="AddHabit"
        component={AddHabit}
        options={{
          title: "Gewohnheit hinzufügen",
        }}
      />
      <StackHabits.Screen name="HabitDetails" component={HabitsDetails} />
      <StackHabits.Screen name="EditHabit" component={EditHabit} />
      <StackHabits.Screen name="HabitsQueue" component={HabitsQueue} />
    </StackHabits.Navigator>
  );
}

function Quotes() {
  return (
    <StackQuotes.Navigator>
      <StackQuotes.Screen
        name="ChooseCategorie"
        component={CategorieOverview}
        options={{ title: "Wähle eine Kategorie" }}
      />
      <StackQuotes.Screen
        name="Categorie"
        component={QuotesCategorie}
        options={{ title: "Categorie" }}
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
        options={{ title: "Pomodoro Timer" }}
      />
      <StackPomodoro.Screen
        name="PomodoroSettings"
        component={PomodoroSettings}
        options={{ title: "Pomodoro Settings" }}
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
        options={{ title: "Zielübersicht Monat" }}
      />
      <StackGoals.Screen
        name="WeeklyOverviewGoals"
        component={WeeklyOverviewGoals}
        options={{ title: "Zielübersicht Woche" }}
      />
      <StackGoals.Screen
        name="DailyOverviewGoals"
        component={DailyOverviewGoals}
        options={{ title: "Zielübersicht Tag" }}
      />
      <StackGoals.Screen
        name="AddGoal"
        component={AddGoal}
        options={{ title: "Ziel hinzufügen" }}
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
        options={{ title: "Aktivitäten" }}
      />
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
          activeTintColor: "blue",
          inactiveTintColor: "gray",
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
