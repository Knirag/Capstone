import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Colours from "../constants/colors";
import { login } from "../utils/auth"; 
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 400,
    marginTop: 40,
    zIndex: 100,
    elevation: 100,
  },
  heading: {
    zIndex: 1,
    fontSize: 30,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginTop: -90,
  },
  subtext: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  form: {
    marginVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colours.blue,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  countryCode: {
    fontSize: 18,
    color: Colours.darkgray,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colours.blue,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    marginLeft: 10,
    color: Colours.darkgray,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    zIndex: 1,
  },
  gradientButton: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: Colours.white,
    fontSize: 18,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  touchableArea: {
    paddingHorizontal: 10, // Expand horizontally
    paddingVertical: 10, // Expand vertically
  },
});
const Loginscreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  const toggleSecureText = () => setSecureText(!secureText);

  const handlePhoneNumberChange = (input) => {
    const formattedInput = input.replace(/^0+/, ""); // Removes leading 0s
    if (formattedInput.length <= 9) setPhoneNumber(formattedInput);
  };

  const handleLogin = async () => {
    try {
      const data = await login(phoneNumber, password);
      Alert.alert("Success", "Login successful!");
      console.log("Logged in user data:", data);

      // Navigate to the next screen
      navigation.navigate("MainTabs"); 
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.message || "Unable to login. Please try again."
      );
    }
  };

    const navigateToSignup = () => {
      console.log("Navigating to Signup button works ...");
      navigation.navigate("Signup");
    };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colours.primary, Colours.secondary]}
    >
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.heading}>Sign In to Your Account</Text>
        <View style={styles.subtext}>
          <Text>Don't have an Account?</Text>
          <TouchableOpacity
            onPress={navigateToSignup}
            style={styles.touchableArea}
            hitSlop={{ top: 70, bottom: 70, left: 70, right: 70 }}
          >
            <Text
              style={{ color: Colours.blue, fontWeight: "500", fontSize: 16 }}
            >
              Signup Here
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+250</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={9}
            />
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={toggleSecureText}>
              <Icon
                name={secureText ? "eye-off" : "eye"}
                size={24}
                color={Colours.darkgray}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <LinearGradient
            colors={["#02b4fa", "#1475fc"]}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Loginscreen;
