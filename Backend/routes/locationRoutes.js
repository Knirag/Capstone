// routes/locationRoutes.js
const express = require("express");
const { getLocations } = require("../controllers/locationController");
const router = express.Router();

// GET /api/locations - Retrieve all locations
router.get("/", getLocations);

module.exports = router;
