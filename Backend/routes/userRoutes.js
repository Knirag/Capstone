const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");


// Route for updating user details
router.put("/:id", authenticate, updateProfile);

module.exports = router;
