import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
    marginTop: -30,
    zIndex: 5,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginTop: 30,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: Colours.mediumgray,
  },
  back:{
    fontSize: 40,
    color: Colours.blue,
    zIndex: 10,
    marginTop: 50,
  },
});


const SecuritySettings = () => {
const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const navigateToUpdate = () => {
    navigation.navigate("UpdatePassword");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="chevron-back-sharp" style={styles.back} size={24} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Security Settings</Text>

      {/* Change Password */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Change Password</Text>
        <TouchableOpacity style={styles.optionRow} onPress={navigateToUpdate}>
          <Text style={styles.optionText}>Update your password</Text>
          <Icon name="key-outline" size={20} color={Colours.skyblue} />
        </TouchableOpacity>
      </View>

      {/* Two-Factor Authentication */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Enable 2FA</Text>
          <Icon
            name="shield-checkmark-outline"
            size={20}
            color={Colours.skyblue}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default SecuritySettings;
