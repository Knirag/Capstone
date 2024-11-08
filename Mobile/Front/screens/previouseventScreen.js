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
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  week: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 0,
    width: "100%",
  },
  durationlabel: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 5,
    justifyContent: "flex-start",
    color: Colours.darkgray,
  },
  event: {
    borderRadius: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(140, 221, 255, 0.22)",
    backgroundOpacity: 0.1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  eventDetails: {
    flexDirection: "column",
    zIndex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginLeft: 10,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    zIndex: 1,
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginLeft: 0,
    marginTop: 12,
    width: "100%",
    zIndex: 1,
  },
  eventDate: {
    flexDirection: "column",
    fontSize: 18,
    color: Colours.darkgray,
    marginLeft: 10,
  },
  eventTime: {
    flexDirection: "column",
    fontSize: 18,
    color: Colours.darkgray,
    marginLeft: 10,
  },
  eventExpand: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: -12,
    fontSize: 20,
    fontWeight: "condensed",
    color: Colours.blue,
    zIndex: 99,
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
      <View style={styles.body}>
        <ScrollView>
          <View style={styles.week}>
            <Text style={styles.durationlabel}>November</Text>
            <TouchableOpacity style={styles.event}>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>Event Title</Text>
                <View style={styles.eventRow}>
                  <Text style={styles.eventDate}>Date</Text>
                  <Text style={styles.eventTime}>Time</Text>
                  <Icon
                    name="chevron-forward-outline"
                    style={styles.eventExpand}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.week}>
            <Text style={styles.durationlabel}>October</Text>
            <TouchableOpacity style={styles.event}>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>Event Title</Text>
                <View style={styles.eventRow}>
                  <Text style={styles.eventDate}>Date</Text>
                  <Text style={styles.eventTime}>Time</Text>
                  <Icon
                    name="chevron-forward-outline"
                    style={styles.eventExpand}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PreviousEvents;
