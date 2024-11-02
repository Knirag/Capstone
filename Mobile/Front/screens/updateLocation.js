import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";

import Colours from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f8f8f8",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginTop: -33,
    zIndex: 5,
    alignSelf: "center",
  },
  back: {
    fontSize: 35,
    color: Colours.blue,
    zIndex: 10,
    marginTop: 50,
  },
  body: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  currentLocationLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginBottom: 5,
  },
  currentLocationText: {
    fontSize: 14,
    color: Colours.gray,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colours.darkgray,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colours.lightgray,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: Colours.skyblue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 20,
    width: "100%", 
    alignItems:"center",
    textTransform:"uppercase",
    fontWeight:"bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colours.lightgray,
    borderRadius: 5,
    color: Colours.darkgray,
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colours.lightgray,
    borderRadius: 5,
    color: Colours.darkgray,
    paddingRight: 30,
    marginBottom: 20,
  },
  
});
const UpdateLocation = () => {
  const navigation = useNavigation();
  const [district, setDistrict] = useState(null);
  const [sector, setSector] = useState(null);
  const [cell, setCell] = useState(null);
  const [village, setVillage] = useState(null);
  const [houseAddress, setHouseAddress] = useState("");

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="chevron-back-sharp" style={styles.back} size={24} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Update Your Location</Text>
      <ScrollView style={styles.body}>
        <View style={styles.locationBox}>
          <Text style={styles.currentLocationLabel}>Current Location:</Text>
          <Text style={styles.currentLocationText}>District: Gasabo</Text>
          <Text style={styles.currentLocationText}>Sector: Remera</Text>
          <Text style={styles.currentLocationText}>Cell: Rukiri II</Text>
          <Text style={styles.currentLocationText}>Village: Rebero</Text>
        </View>

        {/* Replace with actual location data */}
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
        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UpdateLocation;
