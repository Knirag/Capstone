import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Colours from "../constants/colors";
// import Loginscreen from "./screens/Login";

// Style Sheets
const styles = StyleSheet.create({
  container: {
    dispaly: "flex",
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
  footer: {
    zIndex: 100,
    elevation: 100,
    position:"absolute",
    top: 200,
  
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
  },
});


const Languageselect = () => {
    const navigation = useNavigation(); 

    const navigateToLogin = () => {
      navigation.navigate("Login");
    };
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colours.primary, Colours.secondary]}
    >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text
          style={{
            color: Colours.darkgray,
            fontSize: 24,
            marginBottom: 60,
            zIndex: 1,
          }}
        >
          Select Language/Hitamo Ururimi
        </Text>
        <Image source={require("../assets/hands.png")} style={styles.footer} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={["#02b4fa", "#1475fc"]} // Blue to cyan gradient
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Kinyarwanda</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <LinearGradient
            colors={["#02b4fa", "#1475fc"]} // Blue to cyan gradient
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>English</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Languageselect;
