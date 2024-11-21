const bcrypt = require("bcryptjs");
const { getUserByEmail, createUser } = require("../models/User");
const { generateToken } = require("../utils/jwtHelper");
const redisClient = require("../utils/redis");
const { sendOTP, verifyOTP } = require("../utils/twilio");

exports.signup = async (req, res) => {
  const {
    username,
    email,
    phone_number,
    age,
    password,
    location_id,
    home_address,
    otp, // Add `otp` to the payload
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // OTP Flow
    if (!otp) {
      // Send OTP
      await sendOTP(phone_number);
      return res.status(200).json({
        message: "OTP sent successfully. Please verify to complete signup.",
      });
    }

    // Verify OTP
    const verificationResult = await verifyOTP(phone_number, otp);
    if (verificationResult.status !== "approved") {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Hash password and save user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      email,
      phone_number,
      age,
      password: passwordHash,
      location_id,
      home_address,
    });

    const token = generateToken({ id: user.id });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Endpoint
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

 const token = generateToken({ id: user.id }, "30d");
     res.json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
