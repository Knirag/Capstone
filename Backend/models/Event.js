const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const formatDateForMySQL = (date) => {
  const formattedDate = new Date(date)
    .toISOString()
    .slice(0, 19) // Get the 'YYYY-MM-DD HH:MM:SS' part
    .replace("T", " "); // Replace 'T' with a space

  return formattedDate; // Return the correctly formatted date
};



// Create a new event
const createEvent = async ({
  title,
  description,
  event_date,
  location_id,
  event_place,
  created_by,
}) => {
  const id = uuidv4();
  const formattedDate = formatDateForMySQL(event_date);

  await pool.query(
    `INSERT INTO events (id, title, description, event_date, location_id, event_place, created_by) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      title,
      description,
      formattedDate,
      location_id,
      event_place,
      created_by,
    ]
  );

  const [eventResult] = await pool.query(
    "SELECT id, title, description, event_date, location_id, created_by FROM events WHERE id = ?",
    [id]
  );

  return eventResult[0];
};


// Get events by location (with hierarchical support)
const getEventsByLocation = async (locationId) => {
  const query = `SELECT * FROM events WHERE location_id = ? ORDER BY event_date DESC`;
  const [rows] = await pool.query(query, [locationId]);
  console.log("Database query result in model:", rows); // Debugging
  return rows;
};

// Get event by ID
const getEventById = async (id) => {
  const [result] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  return result[0];
};

// Update event by ID
const updateEvent = async (
  id,
  { title, description, event_date,event_place }
) => {
  await pool.query(
    `UPDATE events 
     SET title = ?, description = ?, event_date = ?, event_place= ?
     WHERE id = ?`,
    [title, description, event_date, event_place, id]
  );
  return { id, title, description, event_date, event_place };
};
const getChildLocations = async (parentLocationId) => {
  try {
    const query = `
      SELECT id FROM locations WHERE parent_id = ?
    `;
    const [results] = await pool.query(query, [parentLocationId]);
    return results.map((loc) => loc.id);
  } catch (error) {
    console.error("Error fetching child locations:", error);
    throw error;
  }
};

// Delete event by ID
const deleteEvent = async (id) => {
  const [result] = await pool.query("DELETE FROM events WHERE id = ?", [id]);
  return result.affectedRows > 0
    ? { message: "Event deleted successfully" }
    : { message: "Event not found" };
};

module.exports = {
  createEvent,
  getEventsByLocation,
  getEventById,
  updateEvent,
  deleteEvent,
  getChildLocations
};
