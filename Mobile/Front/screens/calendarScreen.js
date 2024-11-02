import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";
import Colours from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    height: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colours.skyblue,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colours.darkgray,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colours.lightgray,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colours.darkgray,
  },
  calendarContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

const CalendarScreen = () => {
  const [selected, setSelected] = useState("");
  const [isAgenda, setIsAgenda] = useState(false); // Toggle between Calendar and Agenda

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendar</Text>
        <Icon name="calendar-number-sharp" size={24} color={Colours.skyblue} />
      </View>

      {/* Tab buttons to toggle between Calendar and Agenda views */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setIsAgenda(false)}
        >
          <Text style={styles.tabButtonText}>Calendar View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setIsAgenda(true)}
        >
          <Text style={styles.tabButtonText}>Agenda View</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        {isAgenda ? (
          <Agenda
            items={{
              "2024-10-17": [{ name: "Event 1" }],
              "2024-10-18": [{ name: "Event 2" }],
            }}
            selected={selected}
            onDayPress={(day) => setSelected(day.dateString)}
            renderItem={(item) => (
              <View style={{ padding: 10, backgroundColor: "#eee" }}>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        ) : (
          <Calendar
            onDayPress={(day) => setSelected(day.dateString)}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CalendarScreen;
