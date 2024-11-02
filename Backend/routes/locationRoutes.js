const express = require("express");
const { setLocation } = require("../controllers/locationController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/set-location", authenticateToken, setLocation);

module.exports = router;
