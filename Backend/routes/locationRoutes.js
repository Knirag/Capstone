const express = require("express");
const {
  getLocations,
  getLocationById,
} = require("../controllers/locationController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Routes related to retrieving location data
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     description: Retrieve all locations from the system.
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the location
 *                     example: "123456"
 *                   name:
 *                     type: string
 *                     description: The name of the location
 *                     example: "Test Cell"
 *                   level:
 *                     type: string
 *                     description: The level of the location (e.g., "cell", "village")
 *                     example: "cell"
 *                   parent_id:
 *                     type: string
 *                     description: The parent location's ID (if applicable)
 *                     example: "654321"
 *       500:
 *         description: Server error while retrieving locations
 */

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get a specific location by ID
 *     description: Retrieve details of a specific location using its ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the location to retrieve
 *         schema:
 *           type: string
 *           example: "123456"
 *     responses:
 *       200:
 *         description: Details of the location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the location
 *                   example: "123456"
 *                 name:
 *                   type: string
 *                   description: The name of the location
 *                   example: "Test Cell"
 *                 level:
 *                   type: string
 *                   description: The level of the location (e.g., "cell", "village")
 *                   example: "cell"
 *                 parent_id:
 *                   type: string
 *                   description: The parent location's ID (if applicable)
 *                   example: "654321"
 *       400:
 *         description: Invalid location ID
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error while retrieving the location
 */

router.get("/", getLocations); // Get all locations
router.get("/:id", getLocationById); // Get specific location by ID

module.exports = router;
