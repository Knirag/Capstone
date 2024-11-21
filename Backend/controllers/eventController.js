const pool = require("../config/db");
const {
  createEvent,
  getEventsByLocation,
  getEventById,
  updateUserPushToken,
} = require("../models/Event"); 
const moment = require("moment");
const { sendNotification } = require("../utils/notifications");
const { getUsersByLocation } = require("../models/User");

exports.createEvent = async (req, res) => {
  const { title, description, event_date, location_id } = req.body;
  const created_by = req.user.id;

  try {
    // Save event in the database
    const [result] = await pool.query(
      `
      INSERT INTO events (title, description, event_date, location_id, created_by)
      VALUES (?, ?, ?, ?, ?)`,
      [title, description, event_date, location_id, created_by]
    );

    // Fetch users for notification
    const pushTokens = await getUsersByLocation(location_id);

    if (pushTokens.length > 0) {
      const notificationTitle = `New Event: ${title}`;
      const notificationBody = description;
      const notificationData = { eventId: result.insertId };

      await sendNotification(
        pushTokens,
        notificationTitle,
        notificationBody,
        notificationData
      );
    }

    res
      .status(201)
      .json({
        message: "Event created and notifications sent.",
        eventId: result.insertId,
      });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date } = req.body;

    const updatedEvent = await updateEventById(id, {
      title,
      description,
      event_date,
    });

    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getEventsByLocation = async (req, res) => {
  try {
    const { location_id } = req.params;
    console.log("Fetching events for location_id:", location_id);

    const events = await getEventsByLocation(location_id);
    console.log("Retrieved events:", events);

    if (!events.length) {
      return res
        .status(404)
        .json({ message: "No events found for this location" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching event with ID:", id); // Log the ID being fetched

    const event = await getEventById(id);
    console.log("Event fetched from database:", event); // Log the fetched event

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



