const pool = require("../config/db");
const { generateOtp, verifyOtpExpiration } = require("../utils/otpGenerator.js");

exports.generateOtp = async (req, res) => {
  const { user_id } = req.params;

  try {
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    await pool.query(
      "INSERT INTO user_tokens (user_id, otp, otp_expires_at) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET otp = $2, otp_expires_at = $3",
      [user_id, otp, expiresAt]
    );

    // Here you would integrate with a messaging service to send the OTP to the user’s phone
    res.status(200).json({ message: "OTP generated", otp });
  } catch (error) {
    res.status(500).json({ message: "Error generating OTP", error });
  }
};

exports.verifyOtp = async (req, res) => {
  const { user_id, otp } = req.body;

  try {
    const result = await pool.query(
      "SELECT otp, otp_expires_at FROM user_tokens WHERE user_id = $1",
      [user_id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "OTP not found" });

    const { otp: storedOtp, otp_expires_at: expiresAt } = result.rows[0];

    if (storedOtp !== otp || verifyOtpExpiration(expiresAt)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
