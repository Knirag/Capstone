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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "../utils/api";
import Colours from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    // backgroundColor: "rgba(0, 0, 255, 0.1)", --Debugging 
  },
  form: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 15,
    justifyContent: "center",
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
    color: Colours.blue,
  },
  button: {
    marginTop: 10,
    width: "100%",
    // alignItems: "left",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 19,
  },
  gradientButton: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colours.white,
    fontSize: 18,
    textTransform: "uppercase",
  },
  icon2: {
    // marginLeft: 10,
    color: Colours.white,
  },
  // touchableArea: {
  //   paddingHorizontal: 0,
  //   paddingVertical: 0,
  //   zIndex: 1,
  // },
});
const SignupScreen = () => {
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState(new Date());
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureRepeatText, setSecureRepeatText] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleSecureText = () => setSecureText(!secureText);
  const toggleSecureRepeatText = () => setSecureRepeatText(!secureRepeatText);

  const handlePhoneNumberChange = (input) => {
    const formattedInput = input.replace(/^0+/, ""); 
    if (formattedInput.length <= 9) {
      setPhoneNumber(formattedInput);
    }
  };


  const navigation = useNavigation();

  const navigateToLogin = () => {
    console.log("Login Pressed");
    navigation.navigate("Login");
  };

 const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") { // Only close the picker if the user confirms
    setDob(selectedDate || dob);
    setShowDatePicker(false);
  } else if (event.type === "dismissed") {
    setShowDatePicker(false); // Close if dismissed
  }
};
 

 const calculateAge = (dob) => {
   const today = new Date();
   const birthDate = new Date(dob);
   let age = today.getFullYear() - birthDate.getFullYear();
   const m = today.getMonth() - birthDate.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
     age--;
   }
   return age;
 };

const navigateToNext = () => {
  if (!names || !email || !phoneNumber || !password || !repeatPassword) {
    Alert.alert("Error", "All fields are required.");
    return;
  }

  if (password !== repeatPassword) {
    Alert.alert("Error", "Passwords do not match.");
    return;
  }

  const age = calculateAge(dob);
  if (age < 18) {
    Alert.alert("Error", "You must be at least 18 years old to sign up.");
    return;
  }

  const formattedPhoneNumber = `+250${phoneNumber}`;
  const userData = {
    username: names,
    phone_number: formattedPhoneNumber,
    email,
    age,
    password,
  };

  console.log("Navigating to Location with userData:", userData);
  navigation.navigate("Location", { userData }); // Pass user data to Location Selector
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
            <Text style={styles.heading}>Create Your Account</Text>
            <View style={styles.subtext}>
              <Text>Already have an Account?</Text>
              <TouchableOpacity
                onPress={navigateToLogin}
                style={styles.touchableArea}
                hitSlop={{
                  bottom: 40,
                  top: 20,
                  left: 20,
                  right: 20,
                }}
              >
                <Text
                  style={{
                    color: Colours.blue,
                    fontWeight: "500",
                    fontSize: 15,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
              {/* </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.form}>
            {/* Names Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Names"
                value={names}
                onChangeText={setNames}
                required
              />
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+250</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                maxLength={9} // Limits to 9 digits
              />
            </View>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Age (Calendar for Date of Birth) */}
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={1}
            >
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={dob.toDateString()}
                editable={false}
                pointerEvents="none"
              />
              {showDatePicker && (
                <DateTimePicker
                  value={dob}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </TouchableOpacity>

            {/* Password Input */}
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

            {/* Repeat Password Input */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Repeat Password"
                secureTextEntry={secureRepeatText}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
              />
              <TouchableOpacity onPress={toggleSecureRepeatText}>
                <Icon
                  name={secureRepeatText ? "eye-off" : "eye"}
                  size={24}
                  color={Colours.darkgray}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={navigateToNext}>
            <LinearGradient
              colors={["#02b4fa", "#1475fc"]} // Blue to cyan gradient
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>
                Next <Icon name="caret-forward-outline" style={styles.icon2} />
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignupScreen;
