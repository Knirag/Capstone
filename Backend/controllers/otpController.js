const twilio = require("twilio");
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const pool = require("../config/db");

exports.sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_NUMBER, // Use Twilio number from environment variables
      to: phoneNumber,
    });

    // Save OTP and phone number in the database
    await pool.query(
      "INSERT INTO otps (phone_number, otp, created_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE otp = ?, created_at = NOW()",
      [phoneNumber, otp, otp]
    );

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phoneNumber, userOtp } = req.body;

  try {
    const [results] = await pool.query(
      "SELECT otp FROM otps WHERE phone_number = ? AND created_at > (NOW() - INTERVAL 10 MINUTE)",
      [phoneNumber]
    );

    if (results.length === 0) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    const storedOtp = results[0].otp;

    if (storedOtp === userOtp) {
      res.status(200).json({ message: "OTP Verified" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
