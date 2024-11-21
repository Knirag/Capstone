import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import usePushNotifications from "./hooks/usePushNotifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Languageselect from "./screens/languageselect.js";
import Loginscreen from "./screens/loginscreen.js";
import SignupScreen from "./screens/signupscreen.js";
import LocationSelector from "./screens/locationselectorscreen.js";
import OTPScreen from "./screens/OTPScreen.js";
import AppTabs from "./navigation/TabNavigator";
import SecuritySettings from "./screens/securityScreen.js";
import DetailsScreen from "./screens/changeDetailsScreen.js";
import UpdatePassword from "./screens/updatePassword.js";
import UpdateLocation from "./screens/updateLocation.js";
import UpdateUserDetails from "./screens/updateUserDetails.js";
import EventDetailScreen from "./screens/EventDetailScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const { expoPushToken } = usePushNotifications();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Non-tab screens */}
        <Stack.Screen
          name="Welcome"
          component={Languageselect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Loginscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Location"
          component={LocationSelector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SecuritySettings"
          component={SecuritySettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateLocation"
          component={UpdateLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUserDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={AppTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
