const pool = require("../config/db");

// Create a new notification
const createNotification = async ({
  title,
  description,
  date,
  location_id,
  created_by,
}) => {
  const [result] = await pool.query(
    `INSERT INTO notifications (title, description, date, location_id, created_by) 
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, date, location_id, created_by]
  );

  // Retrieve the newly created notification
  const [notificationRows] = await pool.query(
    "SELECT * FROM notifications WHERE id = ?",
    [result.insertId]
  );
  return notificationRows[0];
};

// Get notifications by location
const getNotificationsByLocation = async (location_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM notifications WHERE location_id = ? ORDER BY date DESC",
    [location_id]
  );
  return rows;
};

module.exports = { createNotification, getNotificationsByLocation };
