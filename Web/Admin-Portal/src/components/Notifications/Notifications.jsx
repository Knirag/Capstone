import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colours from "../../assets/Colours/Colours";
import instance from "../../../api";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${Colours.darkgray};
  margin-bottom: 30px;
  text-align: center;
`;

const FormContainer = styled.div`
  background: ${Colours.lightgray};
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${Colours.darkgray};
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-color: ${Colours.blue};
    box-shadow: 0 0 6px rgba(102, 166, 255, 0.3);
  }
`;

const Button = styled.button`
  background: ${Colours.blue};
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background: ${Colours.darkblue};
    box-shadow: 0 4px 10px rgba(85, 139, 211, 0.4);
  }
`;
const EventsContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  border-top: 1px solid #ccc;
`;

const EventCard = styled.div`
  padding: 15px;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 15px;
`;

const EventTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 5px;
`;

const EventDate = styled.p`
  font-size: 1rem;
  color: #777;
`;

const EventDetails = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Notifications = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [adminLocation, setAdminLocation] = useState(""); // Admin's location ID
  const [adminId, setAdminId] = useState(""); // Admin's ID
  const [events, setEvents] = useState([]); // Events to display

  // Fetch admin location and events on mount
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found, unable to fetch admin data");
        return;
      }

      try {
        const adminResponse = await instance.get("/admin/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { id, location_id } = adminResponse.data.admin;
        console.log("Fetched admin data:", adminResponse.data.admin); // Debugging
        setAdminLocation(location_id); // Set the admin location ID
        setAdminId(id); // Set the admin ID
      } catch (error) {
        console.error("Error fetching admin data:", error.response || error);
      }
    };

    fetchAdminData();
  }, []);

  // Fetch events once admin location is available
  useEffect(() => {
    if (adminLocation) {
      console.log("Fetching events for location:", adminLocation); // Debugging
      fetchScheduledEvents();
    }
  }, [adminLocation]);

  const fetchScheduledEvents = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No token found, unable to fetch events");
        return;
      }

      const response = await instance.get(`/events`, {
        params: { location_id: adminLocation },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched events:", response.data); // Debugging
      setEvents(response.data); // Update state with fetched events
    } catch (error) {
      console.error(
        "Error fetching scheduled events:",
        error.response || error
      );
    }
  };

  const handleCreateEvent = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.error("No token found, cannot fetch admin data");
      return;
    }

    try {
      const eventDateTime = `${eventDate} ${eventTime}`;
      const eventData = {
        title: eventTitle,
        description: eventDescription,
        event_date: eventDateTime,
        location_id: adminLocation,
        event_place: eventPlace,
        created_by: adminId,
      };

      await instance.post("/events", eventData);
      alert("Event created successfully!");

      setEventTitle("");
      setEventDescription("");
      setEventDate("");
      setEventTime("");
      setEventPlace("");

      fetchScheduledEvents(); // Refresh events
    } catch (error) {
      console.error("Error creating event:", error.response || error);
      alert("Failed to create event.");
    }
  };


  return (
    <PageContainer>
      <Header>Create and Send Event Notification</Header>

      {/* Event Form */}
      <FormContainer>
        <Label htmlFor="title">Event Title:</Label>
        <Input
          id="title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
        />

        <Label htmlFor="description">Description:</Label>
        <Input
          id="description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Type event description"
        />

        <Label htmlFor="date">Date:</Label>
        <Input
          type="date"
          id="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <Label htmlFor="time">Time:</Label>
        <Input
          type="time"
          id="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />

        <Label htmlFor="eventPlace">Event Place:</Label>
        <Input
          id="eventPlace"
          value={eventPlace}
          onChange={(e) => setEventPlace(e.target.value)}
          placeholder="Enter event place"
        />

        <Button onClick={handleCreateEvent}>Create Event</Button>
      </FormContainer>

      {/* Scheduled Events */}
      <EventsContainer>
        <Header>Scheduled Events</Header>
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id}>
              <EventTitle>{event.title}</EventTitle>
              <EventDetails>{event.description}</EventDetails>
              <EventDetails>
                <strong>Date:</strong>{" "}
                {new Date(event.event_date).toLocaleString()}
              </EventDetails>
              <EventDetails>
                <strong>Place:</strong> {event.event_place}
              </EventDetails>
            </EventCard>
          ))
        ) : (
          <p>No events scheduled yet.</p>
        )}
      </EventsContainer>
    </PageContainer>
  );
};

export default Notifications;

