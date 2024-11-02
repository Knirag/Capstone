import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Colours from "../constants/colors";
import PreviousEvents from "../screens/previouseventScreen"; 
import Dashboardscreen from "../screens/Dashboardscreen"; 
import CalendarScreen from "../screens/calendarScreen"; 
import ProfileSettings from "../screens/SettingsScreen"; 

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // let iconName;

          if (route.name === "Previous") {
            iconName = focused
              ? "arrow-back-circle"
              : "arrow-back-circle-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colours.skyblue,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboardscreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Previous"
        component={PreviousEvents}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileSettings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
