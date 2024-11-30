const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  createEvent,
  updateEvent,
  getEventsByLocation,
  getEventById,
} = require("../controllers/eventController");

const router = express.Router();



router.post("/", adminMiddleware, createEvent); // Create Event
router.put("/:id", adminMiddleware, updateEvent); // Update Event

// Public routes
router.get("/", getEventsByLocation); // Get Events by Location (Query Parameter)
router.get("/events/:id", getEventById); // Get Event by ID

module.exports = router;
