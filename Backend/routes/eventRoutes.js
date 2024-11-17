const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  createEvent,
  updateEvent,
  getEventsByLocation,
} = require("../controllers/eventController");

const router = express.Router();

// Admin routes

router.post("/", authMiddleware, adminMiddleware, createEvent);
router.put("/:id", authMiddleware, adminMiddleware, updateEvent);

router.get("/:location_id", getEventsByLocation);


module.exports = router;