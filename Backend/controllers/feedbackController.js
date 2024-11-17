const {
  addFeedback,
  getFeedbackById,
  getAllFeedback,
} = require("../models/Feedback");

// Add new feedback
exports.addFeedback = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated and user info is in req.user

  if (!message)
    return res.status(400).json({ message: "Message is required." });

  try {
    const feedbackId = await addFeedback(userId, message);
    res
      .status(201)
      .json({ message: "Feedback submitted successfully.", feedbackId });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get specific feedback by ID
exports.getFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await getFeedbackById(id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found." });
    res.json(feedback);
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all feedback (admin view)
exports.getAllFeedback = async (req, res) => {
  const { offset = 0, limit = 10 } = req.query;

  try {
    const feedbacks = await getAllFeedback(Number(offset), Number(limit));
    res.json(feedbacks);
  } catch (error) {
    console.error("Error retrieving all feedback:", error);
    res.status(500).json({ message: "Server error." });
  }
};
