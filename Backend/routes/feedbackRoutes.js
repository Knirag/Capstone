const express = require("express");
const {
  addFeedback,
  getFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Routes related to user feedback and admin management of feedback
 */

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     description: Allows authenticated users to submit feedback.
 *     tags: [Feedback]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the feedback
 *                 example: "This app is very user-friendly!"
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Feedback submitted successfully"
 *       400:
 *         description: Invalid feedback format or missing fields
 *       401:
 *         description: Unauthorized access (missing or invalid token)
 */

/**
 * @swagger
 * /api/feedback/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     description: Allows an admin to view feedback by its specific ID.
 *     tags: [Feedback]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the feedback to retrieve
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       200:
 *         description: Feedback details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The feedback ID
 *                   example: "abc123"
 *                 content:
 *                   type: string
 *                   description: The content of the feedback
 *                   example: "This app is very user-friendly!"
 *       400:
 *         description: Invalid feedback ID
 *       401:
 *         description: Unauthorized access (missing or invalid token)
 *       403:
 *         description: Forbidden (user not an admin)
 *       404:
 *         description: Feedback not found
 */

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get all feedback
 *     description: Allows an admin to view all feedback submissions.
 *     tags: [Feedback]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of feedback submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the feedback
 *                     example: "abc123"
 *                   content:
 *                     type: string
 *                     description: The content of the feedback
 *                     example: "This app is very user-friendly!"
 *       401:
 *         description: Unauthorized access (missing or invalid token)
 *       403:
 *         description: Forbidden (user not an admin)
 */

router.post("/", authMiddleware, addFeedback); // Users submit feedback
router.get("/:id", adminMiddleware, getFeedback); // Admin views specific feedback
router.get("/", adminMiddleware, getAllFeedback); // Admin views all feedback

module.exports = router;
