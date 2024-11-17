const express = require("express");
const { signup, login } = require("../controllers/adminController");
const router = express.Router();

// POST /api/admin/signup - Register a new admin
router.post("/signup", signup);

// POST /api/admin/login - Admin login
router.post("/login", login);

module.exports = router;
