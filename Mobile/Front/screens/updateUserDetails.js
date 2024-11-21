import React, {useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import Colours from "../constants/colors";


const UpdateUserDetails = () => {
  const [currentPhone, setCurrentPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const navigation = useNavigation();


  const handleSwitchNumber = () => {
    console.log("Switch Number confirmed:", newPhone);
    // Add logic here to handle phone number update
  };
   const handleBackPress = () => {
     navigation.goBack();
   };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="chevron-back-sharp" style={styles.back} size={24} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Update Your Phone Number</Text>
      <View style={styles.fieldContainer}>
        {/* Current Phone Number */}
        <Text style={styles.label}>Current Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={currentPhone}
          onChangeText={setCurrentPhone}
          placeholder="Enter current phone number"
          keyboardType="phone-pad"
        />

        {/* New Phone Number */}
        <Text style={styles.label}>New Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={newPhone}
          onChangeText={setNewPhone}
          placeholder="Enter new phone number"
          keyboardType="phone-pad"
        />

        {/* Switch Number Button */}
        <TouchableOpacity style={styles.button} onPress={handleSwitchNumber}>
          <Text style={styles.buttonText}>Switch Number</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginTop: -30,
    marginLeft:30,
    zIndex: 5,
    alignSelf: "center",
  },
  back: {
    fontSize: 35,
    color: Colours.blue,
    zIndex: 10,
    marginTop: 50,
  },
  fieldContainer: {
    marginTop: 60,
  },
  label: {
    fontSize: 16,
    color: Colours.darkgray,
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
  button: {
    backgroundColor: Colours.skyblue,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdateUserDetails;
