const pool = require("../config/db");

// Generate or update OTP
const upsertOtp = async (user_id, otp, otp_expires_at) => {
  const result = await pool.query(
    `INSERT INTO user_tokens (user_id, otp, otp_expires_at) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (user_id) DO UPDATE SET otp = $2, otp_expires_at = $3 RETURNING *`,
    [user_id, otp, otp_expires_at]
  );
  return result.rows[0];
};

// Verify OTP
const verifyOtp = async (user_id, otp) => {
  const result = await pool.query(
    "SELECT otp, otp_expires_at FROM user_tokens WHERE user_id = $1",
    [user_id]
  );
  return result.rows[0];
};

// Save Firebase Cloud Messaging token
const saveFcmToken = async (user_id, fcm_token) => {
  const result = await pool.query(
    `UPDATE user_tokens SET fcm_token = $2 WHERE user_id = $1 RETURNING *`,
    [user_id, fcm_token]
  );
  return result.rows[0];
};

module.exports = { upsertOtp, verifyOtp, saveFcmToken };
