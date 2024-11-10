const pool = require("../config/db");
const {
  generateOtp,
  verifyOtpExpiration,
} = require("../utils/otpGenerator.js");

exports.generateOtp = async (req, res) => {
  const { user_id } = req.params;

  try {
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Insert or update OTP for the user in MySQL
    await pool.query(
      `INSERT INTO user_tokens (user_id, otp, otp_expires_at) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE otp = ?, otp_expires_at = ?`,
      [user_id, otp, expiresAt, otp, expiresAt]
    );

    // Here you would integrate with a messaging service to send the OTP to the user’s phone
    res.status(200).json({ message: "OTP generated", otp });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Error generating OTP", error });
  }
};

exports.verifyOtp = async (req, res) => {
  const { user_id, otp } = req.body;

  try {
    const [result] = await pool.query(
      "SELECT otp, otp_expires_at FROM user_tokens WHERE user_id = ?",
      [user_id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "OTP not found" });

    const { otp: storedOtp, otp_expires_at: expiresAt } = result[0];

    // Verify OTP and check expiration
    if (storedOtp !== otp || verifyOtpExpiration(expiresAt)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
