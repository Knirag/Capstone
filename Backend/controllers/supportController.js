const {
  createSupportTicket,
  updateSupportTicket,
  getSupportTicketById,
  getAllSupportTickets,
} = require("../models/Support");

// Create a new support ticket
exports.createSupportTicket = async (req, res) => {
  const { feedbackId, response } = req.body;
  const adminId = req.admin.id; // Assuming admin is authenticated and their info is in req.admin

  try {
    const ticketId = await createSupportTicket(adminId, feedbackId, response);
    res
      .status(201)
      .json({ message: "Support ticket created successfully.", ticketId });
  } catch (error) {
    console.error("Error creating support ticket:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update a support ticket
exports.updateSupportTicket = async (req, res) => {
  const { id } = req.params;
  const { response, status } = req.body;

  try {
    const updated = await updateSupportTicket(id, { response, status });
    if (!updated)
      return res.status(404).json({ message: "Support ticket not found." });
    res.json({ message: "Support ticket updated successfully." });
  } catch (error) {
    console.error("Error updating support ticket:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get a specific support ticket by ID
exports.getSupportTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await getSupportTicketById(id);
    if (!ticket)
      return res.status(404).json({ message: "Support ticket not found." });
    res.json(ticket);
  } catch (error) {
    console.error("Error retrieving support ticket:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all support tickets
exports.getAllSupportTickets = async (req, res) => {
  const { offset = 0, limit = 10 } = req.query;

  try {
    const tickets = await getAllSupportTickets(Number(offset), Number(limit));
    res.json(tickets);
  } catch (error) {
    console.error("Error retrieving all support tickets:", error);
    res.status(500).json({ message: "Server error." });
  }
};
