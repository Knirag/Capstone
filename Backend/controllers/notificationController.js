const pool = require("../config/db");

exports.createNotification = async (req, res) => {
  const { title, description, date, location_id } = req.body;
  const createdBy = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO notifications (title, description, date, location_id, created_by) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, date, location_id, createdBy]
    );
    res
      .status(201)
      .json({ message: "Notification created", notification: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error });
  }
};

exports.getNotificationsByLocation = async (req, res) => {
  const { location_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM notifications WHERE location_id = $1 ORDER BY date DESC",
      [location_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notifications", error });
  }
};
