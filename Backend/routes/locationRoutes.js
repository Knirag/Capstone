const express = require("express");
const router = express.Router();
const {
  getLocations,
  addLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");
const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Public route to get all locations
router.get("/", getLocations);

// Public route to get a location by ID
router.get("/:id", getLocationById);

// Admin-only routes
router.post("/", authenticate, authorizeAdmin, addLocation);
router.put("/:id", authenticate, authorizeAdmin, updateLocation);
router.delete("/:id", authenticate, authorizeAdmin, deleteLocation);

module.exports = router;
