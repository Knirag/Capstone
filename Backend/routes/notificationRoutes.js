const express = require("express");
const { sendNotification } = require("../controllers/notificationController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/send-notification", authenticateToken, sendNotification);

module.exports = router;
