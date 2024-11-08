const express = require("express");
const { generateOtp, verifyOtp } = require("../controllers/tokenController");
const router = express.Router();

// POST /api/tokens/generate-otp/:user_id - Generate an OTP for user verification
router.post("/generate-otp/:user_id", generateOtp);

// POST /api/tokens/verify-otp - Verify OTP for user
router.post("/verify-otp", verifyOtp);

module.exports = router;
