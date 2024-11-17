const pool = require("../config/db");

// Create a new support ticket
const createSupportTicket = async (
  adminId,
  feedbackId,
  response,
  status = "pending"
) => {
  const [result] = await pool.query(
    "INSERT INTO support (admin_id, feedback_id, response, status) VALUES (?, ?, ?, ?)",
    [adminId, feedbackId, response, status]
  );
  return result.insertId;
};

// Update a support ticket
const updateSupportTicket = async (ticketId, { response, status }) => {
  const [result] = await pool.query(
    "UPDATE support SET response = ?, status = ? WHERE id = ?",
    [response, status, ticketId]
  );
  return result.affectedRows;
};

// Get a support ticket by ID
const getSupportTicketById = async (ticketId) => {
  const [rows] = await pool.query("SELECT * FROM support WHERE id = ?", [
    ticketId,
  ]);
  return rows[0];
};

// Get all support tickets (admin view)
const getAllSupportTickets = async (offset = 0, limit = 10) => {
  const [rows] = await pool.query(
    "SELECT * FROM support ORDER BY created_at DESC LIMIT ?, ?",
    [offset, limit]
  );
  return rows;
};

module.exports = {
  createSupportTicket,
  updateSupportTicket,
  getSupportTicketById,
  getAllSupportTickets,
};
