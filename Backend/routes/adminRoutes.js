const express = require("express");
const {
  adminSignup,
  adminLogin,
  verifyAdminRole,
} = require("../controllers/adminController");
const router = express.Router();

// POST /api/admin/signup - Register a new admin
router.post("/signup", adminSignup);

// POST /api/admin/login - Admin login
router.post("/login", adminLogin);

module.exports = router;
