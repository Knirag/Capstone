const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication (signup and login)
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Allows a new user to register an account.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: The email address of the new user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the new user (will be hashed)
 *                 example: securepassword123
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the new user
 *                 example: "+1234567890"
 *               age:
 *                 type: integer
 *                 description: The age of the new user
 *                 example: 25
 *               location_id:
 *                 type: string
 *                 description: The location ID associated with the user
 *                 example: "location-uuid-1234"
 *               home_address:
 *                 type: string
 *                 description: The home address of the user
 *                 example: "123 Main St, Springfield, IL"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully registered"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the newly created user
 *                       example: "e2f5d3f3-4f99-4b30-b418-6740402928c1"
 *                     username:
 *                       type: string
 *                       description: The username of the new user
 *                       example: john_doe
 *                     email:
 *                       type: string
 *                       description: The email address of the new user
 *                       example: john.doe@example.com
 *                     phone_number:
 *                       type: string
 *                       description: The phone number of the new user
 *                       example: "+1234567890"
 *                     age:
 *                       type: integer
 *                       description: The age of the user
 *                       example: 25
 *                     location_id:
 *                       type: string
 *                       description: The location ID associated with the user
 *                       example: "location-uuid-1234"
 *                     home_address:
 *                       type: string
 *                       description: The home address of the user
 *                       example: "123 Main St, Springfield, IL"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the user was created
 *                       example: "2024-01-01T00:00:00Z"
 *       400:
 *         description: Invalid input or missing fields
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Allows a registered user to log in and obtain a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: securepassword123
 *     responses:
 *       200:
 *         description: User successfully logged in and received a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication
 *                   example: "jwt-token-here"
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Invalid input or missing fields
 */

// POST /api/auth/signup - Register a new user
router.post("/signup", signup);

// POST /api/auth/login - User login
router.post("/login", login);

module.exports = router;
