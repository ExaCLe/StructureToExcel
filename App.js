import React from "react";
import { Button, TouchableHighlight, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HabitOverview from "./components/HabitOverview.js";
import AddHabit from "./components/AddHabit.js";
import QuotesOverview from "./components/QuotesOverview.js";
import CategorieOverview from "./components/CategorieOverview.js";
import CategorieQuotes from "./components/CategorieQuotes.js";

const StackHabits = createStackNavigator();

const StackQuotes = createStackNavigator();

const Tab = createBottomTabNavigator();

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
    </StackHabits.Navigator>
  );
}

function Quotes() {
  return (
    <StackQuotes.Navigator>
      <StackQuotes.Screen
        name="ChooseCategorie"
        component={QuotesOverview}
        options={{ title: "Wähle Kategorie" }}
      />
      <StackQuotes.Screen
        name="Categorie"
        component={QuotesOverview}
        options={{ title: "Zitate" }}
      />
    </StackQuotes.Navigator>
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
        <Tab.Screen name="Quotes" component={Quotes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
