const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { sendNotification } = require("../controllers/notificationController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Routes related to sending notifications
 */

/**
 * @swagger
 * /api/notifications/send:
 *   post:
 *     summary: Send a notification
 *     description: Sends a notification to the appropriate recipients. Requires admin privileges.
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: The notification details to be sent
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The content of the notification
 *                 example: "System maintenance will occur at midnight."
 *               recipient:
 *                 type: string
 *                 description: The recipient level (e.g., All Constituents, District Leaders)
 *                 example: "District Leaders"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date the notification will be sent
 *                 example: "2024-12-01"
 *               time:
 *                 type: string
 *                 format: time
 *                 description: The time the notification will be sent
 *                 example: "10:00:00"
 *     responses:
 *       200:
 *         description: Notification successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the notification was successfully sent
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: The status message of the notification process
 *                   example: "Notification sent successfully."
 *       400:
 *         description: Invalid input or bad request
 *       401:
 *         description: Unauthorized - The request does not have a valid authentication token
 *       403:
 *         description: Forbidden - The user does not have the required admin privileges
 *       500:
 *         description: Internal server error while sending the notification
 */

router.post("/send", authMiddleware, adminMiddleware, sendNotification);

module.exports = router;
