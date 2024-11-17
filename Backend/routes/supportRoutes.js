const express = require("express");
const {
  createSupportTicket,
  updateSupportTicket,
  getSupportTicket,
  getAllSupportTickets,
} = require("../controllers/supportController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/", authenticateAdmin, createSupportTicket); // Create support ticket
router.put("/:id", authenticateAdmin, updateSupportTicket); // Update support ticket
router.get("/:id", authenticateAdmin, getSupportTicket); // View specific support ticket
router.get("/", authenticateAdmin, getAllSupportTickets); // View all support tickets

module.exports = router;
