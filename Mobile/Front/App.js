import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

import { ThemeProvider } from "./utils/ThemeContext";
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("New Event Notification", remoteMessage.notification.body);
    });

    return unsubscribe;
  }, []);
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
        <ThemeProvider>
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
            name="MainTabs" // This is the stack entry that shows the tabs
            component={AppTabs}
            options={{ headerShown: false }}
          />
        </ThemeProvider>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
