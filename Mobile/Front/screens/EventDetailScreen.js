import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
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
  eventContainer: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: Colours.darkgray,
  },
  detail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    lineHeight: 22,
  },
  reminderContainer: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    marginTop: 15,
  },
  reminderText: {
    fontSize: 16,
    color: Colours.blue,
    marginLeft: 8,
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

const EventDetailScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReminder = () => {
    alert("Reminder set for this event!");
  };

  // Placeholder event data
  const event = {
    title: "Community Cleanup Drive",
    event_date: "2024-12-01T10:00:00Z",
    description:
      "Join us for a community cleanup drive. We’ll be cleaning up the park and surrounding areas to make our environment cleaner and greener.",
    location: "Central Park, Main Street",
    posted_by: "John Doe",
    post_time: "2024-11-17T10:00:00Z",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="chevron-back-sharp" style={styles.back} size={24} />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerText}>Event Details</Text>

      {/* Event Details */}
      <View style={styles.eventContainer}>
        <Text style={styles.label}>Event Name:</Text>
        <Text style={styles.detail}>{event.title}</Text>

        <Text style={styles.label}>Date and Time:</Text>
        <Text style={styles.detail}>
          {new Date(event.event_date).toLocaleString()}
        </Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.detail}>{event.description}</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.detail}>{event.location}</Text>

        <Text style={styles.label}>Posted By:</Text>
        <Text style={styles.detail}>{event.posted_by}</Text>

        <Text style={styles.label}>Posted On:</Text>
        <Text style={styles.detail}>
          {new Date(event.post_time).toLocaleString()}
        </Text>

        {/* Reminder Section */}
        <TouchableOpacity
          style={styles.reminderContainer}
          onPress={handleReminder}
        >
          <FontAwesome name="bell" size={20} color={Colours.gold} />
          <Text style={styles.reminderText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Go Back Button */}

    </ScrollView>
  );
};

export default EventDetailScreen;
