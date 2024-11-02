import React, {useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
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
    color: Colours.skyblue,
    zIndex: 10,
    marginTop: 50,
  },
  fieldContainer: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colours.lightgray,
    marginBottom: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colours.darkgray,
  },
  eyeIcon: {
    fontSize: 22,
    color: Colours.lightgray,
  },
  confirmButton: {
    marginTop: 30,
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
});

const UpdatePassword = () => {
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);


    const handleBackPress = () => {
      navigation.goBack();
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="chevron-back-sharp" style={styles.back} size={24} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Update Your Password</Text>
      <View style={styles.fieldContainer}>
        {/* Current Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Icon
              name={showCurrentPassword ? "eye-off" : "eye"}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* New Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Icon
              name={showNewPassword ? "eye-off" : "eye"}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Retype New Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Retype New Password"
            secureTextEntry={!showRetypePassword}
            value={retypePassword}
            onChangeText={setRetypePassword}
          />
          <TouchableOpacity
            onPress={() => setShowRetypePassword(!showRetypePassword)}
          >
            <Icon
              name={showRetypePassword ? "eye-off" : "eye"}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UpdatePassword
