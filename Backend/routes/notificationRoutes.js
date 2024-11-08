const express = require("express");
const {
  createNotification,
  getNotificationsByLocation,
} = require("../controllers/notificationController");
const { verifyAdminRole } = require("../controllers/adminController");
const router = express.Router();

// POST /api/notifications - Only admins can create a notification
router.post("/", verifyAdminRole, createNotification);

// GET /api/notifications/:location_id - Retrieve notifications (public)
router.get("/:location_id", getNotificationsByLocation);

module.exports = router;
