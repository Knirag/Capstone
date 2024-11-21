const pool = require("../config/db");

// Create a new event
const createEvent = async ({
  title,
  description,
  event_date,
  location_id,
  created_by,
}) => {
  const [result] = await pool.query(
    `INSERT INTO events (title, description, event_date, location_id, created_by) 
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, event_date, location_id, created_by]
  );
  return result.insertId; // Return the inserted event ID
};

// Get events by location
const getEventsByLocation = async (location_id) => {
  console.log("Querying events for location_id:", location_id); // Debugging

  const [result] = await pool.query(
    "SELECT * FROM events WHERE location_id = ? ORDER BY event_date DESC",
    [location_id]
  );

  console.log("Query Result:", result); // Debugging
  return result;
};

// Get event by ID
const getEventById = async (id) => {
  console.log("Querying database for event ID:", id); // Log the query input

  const [result] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  console.log("Query result:", result); // Log the query output

  return result[0]; // Return the first result
};



// Update event by ID
const updateEvent = async (
  id,
  { title, description, event_date, location_id }
) => {
  await pool.query(
    `UPDATE events 
     SET title = ?, description = ?, event_date = ?, location_id = ? 
     WHERE id = ?`,
    [title, description, event_date, location_id, id]
  );
  return { id, title, description, event_date, location_id };
};

// Delete event by ID
const deleteEvent = async (id) => {
  await pool.query("DELETE FROM events WHERE id = ?", [id]);
  return { message: "Event deleted successfully" };
};

module.exports = {
  createEvent,
  getEventsByLocation,
  getEventById,
  updateEvent,
  deleteEvent,
};
