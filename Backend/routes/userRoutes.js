// routes/userRoutes.js
const express = require("express");
const { modifyUser } = require("../controllers/userController");
const router = express.Router();

// PUT /api/users/:id - Update user details
router.put("/:id", modifyUser);

module.exports = router;
