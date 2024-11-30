const Event = require("../models/Event"); // Import the Event model, including getChildLocations
const jwtHelper = require("../utils/jwtHelper"); // If you need JWT-related utilities
const pool = require("../config/db");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      event_date,
      location_id,
      event_place,
      created_by,
    } = req.body;

    // Validation for required fields
    if (
      !title ||
      !description ||
      !event_date ||
      !location_id ||
      !event_place ||
      !created_by
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the event
    const event = await Event.createEvent({
      title,
      description,
      event_date,
      location_id,
      event_place,
      created_by,
    });

    // Respond with success
    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      message: "Failed to create event.",
      error: error.message,
    });
  }
};


// Retrieve events by location (including hierarchical support)
const getEventsByLocation = async (req, res) => {
  try {
    const { location_id } = req.query; // Use query parameter
    console.log("Controller: Received location_id:", location_id); // Debugging
    const events = await Event.getEventsByLocation(location_id);
    console.log("Controller: Events Retrieved:", events); // Debugging
    res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({
      message: "Failed to retrieve events.",
      error: error.message,
    });
  }
};


// Get event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.getEventById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({
      message: "Failed to retrieve event.",
      error: error.message,
    });
  }
};

// Update event by ID
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, event_place } = req.body;
    const updatedEvent = await Event.updateEvent(id, {
      title,
      description,
      event_date,
      event_place,
    });

    if (updatedEvent) {
      res.status(200).json({
        message: "Event updated successfully",
        event: updatedEvent,
      });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      message: "Failed to update event.",
      error: error.message,
    });
  }
};

// Delete event by ID
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Event.deleteEvent(id);

    if (result.message === "Event deleted successfully") {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      message: "Failed to delete event.",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEventsByLocation,
  getEventById,
  updateEvent,
  deleteEvent,
};
