const pool = require("../config/db");

// Generate or update OTP
const upsertOtp = async (user_id, otp, otp_expires_at) => {
  const [result] = await pool.query(
    `INSERT INTO user_tokens (user_id, otp, otp_expires_at) 
     VALUES (?, ?, ?) 
     ON DUPLICATE KEY UPDATE otp = VALUES(otp), otp_expires_at = VALUES(otp_expires_at)`,
    [user_id, otp, otp_expires_at]
  );

  // Retrieve the updated or newly inserted OTP
  const [otpRow] = await pool.query(
    "SELECT * FROM user_tokens WHERE user_id = ?",
    [user_id]
  );
  return otpRow[0];
};

// Verify OTP
const verifyOtp = async (user_id) => {
  const [result] = await pool.query(
    "SELECT otp, otp_expires_at FROM user_tokens WHERE user_id = ?",
    [user_id]
  );
  return result[0];
};

// Save Firebase Cloud Messaging token
const saveFcmToken = async (user_id, fcm_token) => {
  await pool.query(`UPDATE user_tokens SET fcm_token = ? WHERE user_id = ?`, [
    fcm_token,
    user_id,
  ]);

  // Retrieve the updated record for confirmation
  const [updatedRow] = await pool.query(
    "SELECT * FROM user_tokens WHERE user_id = ?",
    [user_id]
  );
  return updatedRow[0];
};

module.exports = { upsertOtp, verifyOtp, saveFcmToken };
