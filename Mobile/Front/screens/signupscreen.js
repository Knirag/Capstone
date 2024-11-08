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
    width: "100%",
    dispaly: "flex",
    flexDirection: "column",
    padding: 15,
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
    flexDirection:"row",
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
});
const SignupScreen = () => {
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureRepeatText, setSecureRepeatText] = useState(true);

  const toggleSecureText = () => setSecureText(!secureText);
  const toggleSecureRepeatText = () => setSecureRepeatText(!secureRepeatText);

  const handlePhoneNumberChange = (input) => {
    const formattedInput = input.replace(/^0+/, ""); // Removes leading 0s
    if (formattedInput.length <= 9) {
      setPhoneNumber(formattedInput);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || age;
    setShowDatePicker(false);
    setAge(currentDate);
  };

  const navigation = useNavigation();
  const navigateToLocation = () => {
    navigation.navigate("Location");
  };
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
      <ScrollView>
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colours.primary, Colours.secondary]}
    >
        <View style={styles.container}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.heading}>Sign In to Your Account</Text>
          <View style={styles.subtext}>
            <Text>Already have an Account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text
                style={{ color: Colours.blue, fontWeight: "500", fontSize: 14, zIndex: 1 }}
              >
                {" "}
                Login
              </Text>
            </TouchableOpacity>
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
          >
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={age.toDateString()}
              editable={false} // Disable manual editing
            />
            {showDatePicker && (
              <DateTimePicker
                value={age}
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
        <TouchableOpacity style={styles.button} onPress={navigateToLocation}>
          <LinearGradient
            colors={["#02b4fa", "#1475fc"]} // Blue to cyan gradient
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>
              Next <Icon name="caret-forward-outline" style={styles.icon2} />
            </Text>
          </LinearGradient>
        </TouchableOpacity>
    </LinearGradient>
      </ScrollView>
  );
};

export default SignupScreen;
