const pool = require('../config/db');

// Create a new notification
const createNotification = async ({ title, description, date, location_id, created_by }) => {
  const result = await pool.query(
    `INSERT INTO notifications (title, description, date, location_id, created_by) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, date, location_id, created_by]
  );
  return result.rows[0];
};

// Get notifications by location
const getNotificationsByLocation = async (location_id) => {
  const result = await pool.query(
    'SELECT * FROM notifications WHERE location_id = $1 ORDER BY date DESC',
    [location_id]
  );
  return result.rows;
};

module.exports = { createNotification, getNotificationsByLocation };
