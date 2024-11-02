const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/location", authMiddleware, userController.setLocation);

module.exports = router;
