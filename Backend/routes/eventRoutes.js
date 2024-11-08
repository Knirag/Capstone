const express = require("express");
const {
  createEvent,
  getEventsByLocation,
} = require("../controllers/eventController");
const router = express.Router();

// POST /api/events - Create a new event
router.post("/", createEvent);

// GET /api/events/:location_id - Get events for a specific location
router.get("/:location_id", getEventsByLocation);

module.exports = router;
