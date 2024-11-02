// routes/otpRoutes.js
const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otpController");
const router = express.Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

module.exports = router;
