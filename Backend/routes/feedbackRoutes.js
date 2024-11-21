const express = require("express");
const {
  addFeedback,
  getFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");
const  authMiddleware  = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


const router = express.Router();

// Routes
router.post("/", authMiddleware, addFeedback); // Users submit feedback
router.get("/:id", adminMiddleware, getFeedback); // Admin views specific feedback
router.get("/", authMiddleware, getAllFeedback); // Admin views all feedback

module.exports = router;
