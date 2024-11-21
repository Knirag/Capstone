import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Colours from "../constants/colors";

const Loginscreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  const handlePhoneNumberChange = (input) => {
    const formattedInput = input.replace(/^0+/, ""); // Removes leading 0s
    if (formattedInput.length <= 9) {
      setPhoneNumber(formattedInput);
    }
  };

  const navigation = useNavigation();

  const navigateToSignup = () => {
  console.log("Navigating to Signup button works ...");
    navigation.navigate("Signup");
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colours.primary, Colours.secondary]}
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

          {/* Password Field */}
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
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={["#02b4fa", "#1475fc"]} // Blue to cyan gradient
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Loginscreen;

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
