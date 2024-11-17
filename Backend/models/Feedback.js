const pool = require("../config/db");

// Add feedback to the database
const addFeedback = async (userId, message) => {
  const [result] = await pool.query(
    "INSERT INTO feedback (user_id, message) VALUES (?, ?)",
    [userId, message]
  );
  return result.insertId; // Return the inserted feedback ID
};

// Get feedback by ID
const getFeedbackById = async (feedbackId) => {
  const [rows] = await pool.query("SELECT * FROM feedback WHERE id = ?", [
    feedbackId,
  ]);
  return rows[0];
};

// Get all feedback (optional: paginated)
const getAllFeedback = async (offset = 0, limit = 10) => {
  const [rows] = await pool.query(
    "SELECT * FROM feedback ORDER BY created_at DESC LIMIT ?, ?",
    [offset, limit]
  );
  return rows;
};

module.exports = { addFeedback, getFeedbackById, getAllFeedback };
