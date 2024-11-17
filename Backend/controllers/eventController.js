const { createEvent, getEventsByLocation } = require("../models/Event"); 
const moment = require("moment");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, event_date, location_id } = req.body;
    const created_by = req.user.id;

    console.log("User Role:", req.user.role); // Debug user role
    console.log("Event Data:", {
      title,
      description,
      event_date,
      location_id,
      created_by,
    }); // Debug input data
    const formattedEventDate = moment(event_date).format("YYYY-MM-DD HH:mm:ss");
    const eventId = await createEvent({
      title,
      description,
      event_date: formattedEventDate,
      location_id,
      created_by,
    });

    console.log("Event Created with ID:", eventId); // Debug success
    res.status(201).json({ message: "Event created successfully", eventId });
  } catch (error) {
    console.error("Error creating event:", error); // Debug errors
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date } = req.body;

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.update({ title, description, event_date });
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getEventsByLocation = async (req, res) => {
  try {
    const { location_id } = req.params; // Extract location_id from params
    console.log("Fetching events for location_id:", location_id); // Debugging

    const events = await getEventsByLocation(location_id);
    console.log("Retrieved events:", events); // Debugging

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



