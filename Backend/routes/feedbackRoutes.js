const express = require("express");
const {
  addFeedback,
  getFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");
const {
  authenticateUser,
  authenticateAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/", authenticateUser, addFeedback); // Users submit feedback
router.get("/:id", authenticateAdmin, getFeedback); // Admin views specific feedback
router.get("/", authenticateAdmin, getAllFeedback); // Admin views all feedback

module.exports = router;
