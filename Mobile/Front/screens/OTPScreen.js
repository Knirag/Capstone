import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
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
    fontSize: 28,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginTop: -90,
    textAlign: "center",
  },
  subtext: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: Colours.blue,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    textAlign: "center",
    width: 50,
  },
  button: {
    marginTop: 10,
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
    textTransform: "uppercase",
    fontWeight: "500",
  },
});

const OTPScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Four fields for OTP
  const navigation = useNavigation();
  const route = useRoute();

  const userData = route.params?.userData; // Get the user data passed from the previous screen

  const handleOtpChange = (value, index) => {
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);
  };

  const verifyOtp = async () => {
    const otpCode = otp.join(""); // Combine the OTP digits into a single string
    if (otpCode.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("/auth/signup", {
        ...userData,
        otp: otpCode, // Include the OTP with user data
      });

      console.log("OTP Verified:", response.data);
      Alert.alert("Success", "Signup completed successfully.");
      navigation.replace("MainTabs"); // Navigate to the main dashboard
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    }
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
            <Text style={styles.heading}>
              We've sent a message to *** *** **
              {userData?.phone_number.slice(-3)}
            </Text>
          </View>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          <View style={styles.subtext}>
            <Text>Wrong Phone Number?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{ color: Colours.blue, fontWeight: "500", fontSize: 15 }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <LinearGradient
              colors={["#02b4fa", "#1475fc"]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OTPScreen;
