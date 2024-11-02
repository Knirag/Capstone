import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
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
    marginTop: 10,
    zIndex: 100,
    elevation: 100,
  },
  heading: {
    zIndex: 1,
    fontSize: 30,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginTop: -100,
  },
  form: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    marginBottom: 47,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    zIndex: 1,
  },
  button: {
    marginTop: 10,
    width: "100%",
    // alignItems: "left",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
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
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },

};

const LocationSelector = () => {
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [houseAddress, setHouseAddress] = useState("");

  const handleSubmit = () => {
    console.log({
      district,
      sector,
      cell,
      village,
      houseAddress,
    });
  };
  const navigation = useNavigation();

  const navigateToOTP = () => {
    navigation.navigate("OTPScreen");
  };
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colours.primary, Colours.secondary]}
    >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.heading}>Select Location</Text>
      </View>
      <View style={styles.form}>
        {/* District Picker */}
        <Text style={styles.label}>District:</Text>
        <RNPickerSelect
          onValueChange={(value) => setDistrict(value)}
          items={[{ label: "Gasabo", value: "Gasabo" }]}
          placeholder={{ label: "Select District", value: null }}
          style={pickerSelectStyles}
        />

        {/* Sector Picker */}
        <Text style={styles.label}>Sector:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSector(value)}
          items={[{ label: "Remera", value: "Remera" }]}
          placeholder={{ label: "Select Sector", value: null }}
          style={pickerSelectStyles}
        />

        {/* Cell Picker */}
        <Text style={styles.label}>Cell:</Text>
        <RNPickerSelect
          onValueChange={(value) => setCell(value)}
          items={[{ label: "Rukiri II", value: "Rukiri II" }]}
          placeholder={{ label: "Select Cell", value: null }}
          style={pickerSelectStyles}
        />

        {/* Village Picker */}
        <Text style={styles.label}>Village:</Text>
        <RNPickerSelect
          onValueChange={(value) => setVillage(value)}
          items={[
            { label: "Rebero", value: "Rebero" },
            { label: "Rutsuro I", value: "Rutsuro I" },
            { label: "Rutsuro II", value: "Rutsuro II" },
            { label: "Ubumwe", value: "Ubumwe" },
          ]}
          placeholder={{ label: "Select Village", value: null }}
          style={pickerSelectStyles}
        />

        {/* House Address Input */}
        <Text style={styles.label}>House Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter house address"
          value={houseAddress}
          onChangeText={setHouseAddress}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={navigateToOTP}>
          <LinearGradient
            colors={["#02b4fa", "#1475fc"]} // Blue to cyan gradient
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default LocationSelector;