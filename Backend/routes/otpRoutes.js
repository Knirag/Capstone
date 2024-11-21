const express = require("express");
const { requestOTP, verifyOTP } = require("../controllers/otpController");

const router = express.Router();

// Request OTP
router.post("/request", requestOTP);

// Verify OTP
router.post("/verify", verifyOTP);

module.exports = router;
