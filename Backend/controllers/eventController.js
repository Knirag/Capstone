const pool = require("../config/db");

exports.createEvent = async (req, res) => {
  const { title, description, event_date, location_id } = req.body;
  const createdBy = req.user.id;

  try {
    const [result] = await pool.query(
      `INSERT INTO events (title, description, event_date, location_id, created_by) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, event_date, location_id, createdBy]
    );

    // Use the `insertId` from result to get the created event data
    const [event] = await pool.query("SELECT * FROM events WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json({ message: "Event created", event: event[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

exports.getEventsByLocation = async (req, res) => {
  const { location_id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM events WHERE location_id = ? ORDER BY event_date DESC",
      [location_id]
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
};
