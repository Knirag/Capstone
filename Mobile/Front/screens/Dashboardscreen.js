import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "../utils/api";
import Colours from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colours.skyblue,
    marginBottom: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colours.darkgray,
  },
  icon: {
    padding: 10,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  week: {
    marginBottom: 20,
  },
  durationLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colours.darkgray,
    marginBottom: 10,
  },
  event: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: Colours.lightgray,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colours.darkgray,
  },
  eventInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  eventDate: {
    fontSize: 14,
    color: Colours.darkgray,
  },
  eventTime: {
    fontSize: 14,
    color: Colours.darkgray,
  },
  eventExpand: {
    fontSize: 20,
    color: Colours.blue,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: Colours.red,
    textAlign: "center",
    marginTop: 20,
  },
});

const Dashboardscreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocationId, setUserLocationId] = useState(null);
  const navigation = useNavigation();

  // Fetch user location ID and events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        // Retrieve user token from AsyncStorage
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          setError("User is not logged in.");
          setLoading(false);
          return;
        }

        // Retrieve user location from the backend
        const userResponse = await axios.get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const locationId = userResponse.data.location_id; // Adjust key as per your API response
        setUserLocationId(locationId);

        // Fetch events using the location ID
        const response = await axios.get("/events", {
          params: { location_id: locationId },
          headers: { Authorization: `Bearer ${token}` }, // Pass token if required
        });
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err.response || err.message);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const groupEventsByWeek = () => {
    const now = new Date();
    const thisWeek = [];
    const nextWeek = [];

    events.forEach((event) => {
      const eventDate = new Date(event.event_date);
      const diffInDays = Math.floor((eventDate - now) / (1000 * 60 * 60 * 24));

      if (diffInDays >= 0 && diffInDays < 7) {
        thisWeek.push(event);
      } else if (diffInDays >= 7 && diffInDays < 14) {
        nextWeek.push(event);
      }
    });

    return { thisWeek, nextWeek };
  };

  const { thisWeek, nextWeek } = groupEventsByWeek();

  const navigateToEventDetails = (event) => {
    navigation.navigate("EventDetails", { event });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Events</Text>
        <Icon
          name="search"
          size={24}
          color={Colours.skyblue}
          style={styles.icon}
        />
      </View>

      <ScrollView style={styles.body}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={Colours.blue}
            style={styles.loader}
          />
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.week}>
          <Text style={styles.durationLabel}>This Week</Text>
          {thisWeek.length > 0 ? (
            thisWeek.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.event}
                onPress={() => navigateToEventDetails(event)}
              >
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventDate}>
                      {new Date(event.event_date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.eventTime}>
                      {new Date(event.event_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
                <Icon
                  name="chevron-forward-outline"
                  style={styles.eventExpand}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No events this week.</Text>
          )}
        </View>

        <View style={styles.week}>
          <Text style={styles.durationLabel}>Next Week</Text>
          {nextWeek.length > 0 ? (
            nextWeek.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.event}
                onPress={() => navigateToEventDetails(event)}
              >
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventDate}>
                      {new Date(event.event_date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.eventTime}>
                      {new Date(event.event_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
                <Icon
                  name="chevron-forward-outline"
                  style={styles.eventExpand}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No events next week.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboardscreen;
