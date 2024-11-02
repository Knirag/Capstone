import react, {useState} from 'react'
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
  },
  subtext: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    display: "flex",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
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
    fontWeight: "light",
    textTransform: "uppercase",
    fontWeight: "medium",
    margin: 0,
  },
});
const OTPScreen = () => {
    const [otp, setOtp] = useState(["", "", "", ""]); // Four fields for OTP

    const handleOtpChange = (value, index) => {
      const otpArray = [...otp];
      otpArray[index] = value;
      setOtp(otpArray);
    };

    const handleSubmit = () => {
      const otpValue = otp.join("");
      console.log("OTP entered:", otpValue);
      // You can add OTP verification logic here
      // After successful verification, navigate to the next screen
      navigation.navigate("NextScreen"); // Replace 'NextScreen' with your screen
    };
    const navigation = useNavigation();

    const navigateToDashboard = () => {
      navigation.navigate("Dashboard");
    };
    navigation.replace("MainTabs");
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colours.primary, Colours.secondary]}
    >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.heading}>
          We've sent a message to *** *** **314
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
        <TouchableOpacity>
          <Text
            style={{ color: Colours.blue, fontWeight: "500", fontSize: 15 }}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={navigateToDashboard}>
        <LinearGradient
          colors={["#02b4fa", "#1475fc"]} // Blue to cyan gradient
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default OTPScreen;