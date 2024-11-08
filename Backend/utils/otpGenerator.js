// utils/otpGenerator.js
const crypto = require("crypto");

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};

const verifyOtpExpiration = (expiresAt) => {
  return new Date() > new Date(expiresAt); // Check if the OTP has expired
};

module.exports = { generateOtp, verifyOtpExpiration };
