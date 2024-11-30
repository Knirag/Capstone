const express = require("express");
const {
  updateProfile,
  registerPushToken,
  changeUserLocation,
  confirmAttendance,
} = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: Routes for managing user profile and settings
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     description: This route allows a user to update their profile information (such as username, email, etc.)
 *     tags: [User Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated user profile data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid user ID or input data
 *       401:
 *         description: Unauthorized user (if the user is not authenticated)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/push-token:
 *   post:
 *     summary: Register push notification token
 *     description: This route is used to register or update the user's push notification token.
 *     tags: [User Profile]
 *     requestBody:
 *       description: The push notification token to register
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               push_token:
 *                 type: string
 *                 description: The push notification token for the user
 *                 example: "sample-token"
 *     responses:
 *       200:
 *         description: Push notification token registered successfully
 *       400:
 *         description: Invalid token or input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}/location:
 *   put:
 *     summary: Change user location
 *     description: This route allows a user to change their associated location (e.g., city, region, etc.).
 *     tags: [User Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The new location data for the user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location_id:
 *                 type: string
 *                 description: The ID of the new location
 *     responses:
 *       200:
 *         description: User location updated successfully
 *       400:
 *         description: Invalid location or user ID
 *       401:
 *         description: Unauthorized user (if the user is not authenticated)
 *       500:
 *         description: Internal server error
 */

router.put("/:id", authenticate, updateProfile);
router.post("/push-token", authenticate, registerPushToken);
router.put("/:id/location", authenticate, changeUserLocation);

module.exports = router;
