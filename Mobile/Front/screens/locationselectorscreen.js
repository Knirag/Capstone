import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "../utils/api";
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
  button: {
    marginTop: 10,
    width: "100%",
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
    marginBottom: 20,
    zIndex: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    marginBottom: 20,
    zIndex: 10,
  },
};

const LocationSelector = () => {
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [locations, setLocations] = useState([]); // All location data
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const [villages, setVillages] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const userDetails = route.params?.userData;

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/locations");
        setLocations(response.data);
        // Filter districts directly
        setDistricts(response.data.filter((loc) => loc.level === "district"));
      } catch (error) {
        console.error(
          "Error fetching locations:",
          error.response || error.message
        );
        Alert.alert("Error", "Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, []);

  // Update sectors when a district is selected
  useEffect(() => {
    if (district) {
      setSectors(locations.filter((loc) => loc.parent_id === district));
      setSector(""); // Reset dependent dropdowns
      setCell("");
      setVillage("");
    }
  }, [district]);

  // Update cells when a sector is selected
  useEffect(() => {
    if (sector) {
      setCells(locations.filter((loc) => loc.parent_id === sector));
      setCell(""); // Reset dependent dropdowns
      setVillage("");
    }
  }, [sector]);

  // Update villages when a cell is selected
  useEffect(() => {
    if (cell) {
      setVillages(locations.filter((loc) => loc.parent_id === cell));
      setVillage("");
    }
  }, [cell]);

  const navigateToOTP = async () => {
    if (!district || !sector || !cell || !village || !houseAddress) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const finalSignupData = {
      ...userDetails,
      location: {
        district,
        sector,
        cell,
        village,
        house_address: houseAddress,
      },
    };

    try {
      const response = await axios.post("/auth/signup", finalSignupData);
      console.log("OTP Sent:", response.data);
      Alert.alert("Success", "OTP sent successfully. Please verify.");
      navigation.navigate("OTPScreen", { userData: finalSignupData }); // Pass user data to OTP screen
    } catch (error) {
      console.error(
        "Error Sending OTP:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to send OTP. Please try again.");
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
            <Text style={styles.heading}>Select Location</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>District:</Text>
            <RNPickerSelect
              onValueChange={(value) => setDistrict(value)}
              items={districts.map((dist) => ({
                label: dist.name,
                value: dist.id,
              }))}
              placeholder={{ label: "Select District", value: null }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />

            <Text style={styles.label}>Sector:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSector(value)}
              items={sectors.map((sect) => ({
                label: sect.name,
                value: sect.id,
              }))}
              placeholder={{ label: "Select Sector", value: null }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />

            <Text style={styles.label}>Cell:</Text>
            <RNPickerSelect
              onValueChange={(value) => setCell(value)}
              items={cells.map((cell) => ({
                label: cell.name,
                value: cell.id,
              }))}
              placeholder={{ label: "Select Cell", value: null }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />

            <Text style={styles.label}>Village:</Text>
            <RNPickerSelect
              onValueChange={(value) => setVillage(value)}
              items={villages.map((vill) => ({
                label: vill.name,
                value: vill.id,
              }))}
              placeholder={{ label: "Select Village", value: null }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />

            <Text style={styles.label}>House Address:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter house address"
              value={houseAddress}
              onChangeText={setHouseAddress}
            />

            <TouchableOpacity style={styles.button} onPress={navigateToOTP}>
              <LinearGradient
                colors={["#02b4fa", "#1475fc"]}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Signup</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LocationSelector;
