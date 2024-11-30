const express = require("express");
const router = express.Router();
const {
  createSupportTicket,
  updateSupportTicket,
  getSupportTicket,
  getAllSupportTickets,
} = require("../controllers/supportController");

/**
 * @swagger
 * tags:
 *   name: Support Tickets
 *   description: Routes for managing support tickets (admin only)
 */

/**
 * @swagger
 * /api/support-tickets:
 *   post:
 *     summary: Create a new support ticket
 *     description: This route is used by admins to create a new support ticket.
 *     tags: [Support Tickets]
 *     requestBody:
 *       description: The details of the support ticket to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the support ticket
 *                 example: "Login issue"
 *               description:
 *                 type: string
 *                 description: The detailed description of the issue
 *                 example: "User cannot log into the system."
 *               priority:
 *                 type: string
 *                 description: The priority of the ticket (e.g., 'low', 'medium', 'high')
 *                 example: "high"
 *     responses:
 *       201:
 *         description: Support ticket created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-tickets/{id}:
 *   put:
 *     summary: Update a specific support ticket
 *     description: This route allows admins to update the details of a specific support ticket by its ID.
 *     tags: [Support Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the support ticket to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated details of the support ticket
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Support ticket updated successfully
 *       400:
 *         description: Invalid data or support ticket ID
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-tickets/{id}:
 *   get:
 *     summary: Get a specific support ticket by ID
 *     description: Fetch the details of a specific support ticket using its ID.
 *     tags: [Support Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the support ticket to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Support ticket details returned successfully
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-tickets:
 *   get:
 *     summary: Get all support tickets
 *     description: Fetch all the support tickets for the admin to view.
 *     tags: [Support Tickets]
 *     responses:
 *       200:
 *         description: List of all support tickets
 *       500:
 *         description: Internal server error
 */

const adminMiddleware = require("../middleware/adminMiddleware");
router.post("/", adminMiddleware, createSupportTicket);
router.put("/:id", adminMiddleware, updateSupportTicket);
router.get("/:id", adminMiddleware, getSupportTicket);
router.get("/", adminMiddleware, getAllSupportTickets);
console.log("createSupportTicket:", createSupportTicket);

module.exports = router;
