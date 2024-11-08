const pool = require("../config/db");

exports.createEvent = async (req, res) => {
  const { title, description, event_date, location_id } = req.body;
  const createdBy = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, event_date, location_id, created_by) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, event_date, location_id, createdBy]
    );
    res.status(201).json({ message: "Event created", event: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

exports.getEventsByLocation = async (req, res) => {
  const { location_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE location_id = $1 ORDER BY event_date DESC",
      [location_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
};
