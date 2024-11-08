const pool = require("../config/db");

// Create a new event
const createEvent = async ({
  title,
  description,
  event_date,
  location_id,
  created_by,
}) => {
  const result = await pool.query(
    `INSERT INTO events (title, description, event_date, location_id, created_by) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, event_date, location_id, created_by]
  );
  return result.rows[0];
};

// Get events by location
const getEventsByLocation = async (location_id) => {
  const result = await pool.query(
    "SELECT * FROM events WHERE location_id = $1 ORDER BY event_date DESC",
    [location_id]
  );
  return result.rows;
};

module.exports = { createEvent, getEventsByLocation };
