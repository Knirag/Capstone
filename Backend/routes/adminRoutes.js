const express = require("express");
const { signup, login, getCurrentAdmin } = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();



// POST /api/admin/signup - Register a new admin
router.post("/signup", signup);

// POST /api/admin/login - Admin login
router.post("/login", login);

router.get("/current", adminMiddleware, getCurrentAdmin);

module.exports = router;
