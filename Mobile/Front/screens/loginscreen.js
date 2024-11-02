import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Colours from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
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
    display: "flex",
    flexDirection: "row",
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
    fontWeight: "light",
    textTransform: "uppercase",
    fontWeight: "medium",
  },
  touchableArea: {
    paddingHorizontal: 20,
  },

});
const Loginscreen = () => {
const [phoneNumber, setPhoneNumber] = useState("");
const [password, setPassword] = useState("");
const [secureText, setSecureText] = useState(true);

const toggleSecureText = () => {
  setSecureText(!secureText);
};

const handlePhoneNumberChange = (input) => {
  // Remove leading zero and limit input to 9 digits
  const formattedInput = input.replace(/^0+/, ""); // Removes leading 0s
  if (formattedInput.length <= 9) {
    setPhoneNumber(formattedInput);
  }
};
  const navigation = useNavigation(); 

  const navigateToSignup = () => {
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
          <TouchableOpacity onPress={navigateToSignup} >
              <Text
                style={{ color: Colours.blue, fontWeight: "500", fontSize: 74 }}
              > Signup
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
