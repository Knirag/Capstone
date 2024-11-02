import react, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Colours from "../constants/colors";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
    height: 50,
    width: "100%",
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderBottomColor: Colours.skyblue,
    marginBottom: 20,
  },
  headerText: {
    justifyContent: "space-between",
    width: "35%",
    color: Colours.darkgray,
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "row",
    width: "100%",
    marginRight: -120,
  },
});
const PreviousEvents = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Previous Events</Text>
        <Icon
          name="calendar-number-sharp"
          size={24}
          color={Colours.skyblue}
          style={styles.icon}
        />
      </View>
      <ScrollView>
        <View style={styles.tab}></View>
      </ScrollView>
    </View>
  );
};

export default PreviousEvents;
