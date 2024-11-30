const bcrypt = require("bcryptjs");
const { getUserByEmail, createUser } = require("../models/User");
const { generateToken } = require("../utils/jwtHelper");
const { sendOTP, verifyOTP } = require("../utils/twilio");
const { formatPhoneNumber } = require("../utils/formater");

exports.signup = async (req, res) => {
  const {
    username,
    email,
    phone_number,
    age,
    password,
    location_id,
    home_address,
    otp, 
  } = req.body;

  if (!phone_number) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  const formattedPhoneNumber = formatPhoneNumber(phone_number);

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // OTP Flow: If OTP is not provided, send it.
    if (!otp) {
      console.log("Sending OTP to:", formattedPhoneNumber);
      await sendOTP(formattedPhoneNumber);
      return res.status(200).json({
        message: "OTP sent successfully. Please verify to complete signup.",
      });
    }

    // Verify OTP
    const verificationResult = await verifyOTP(formattedPhoneNumber, otp);
    if (!verificationResult || verificationResult.status !== "approved") {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Hash password and save user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      email,
      phone_number: formattedPhoneNumber,
      age,
      password: passwordHash,
      location_id,
      home_address,
    });

    const token = generateToken({ id: user.id });
    res.status(200).json({
      message: "Signup successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message || "An error occurred during signup.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id }, "30d");
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message || "An error occurred during login.",
    });
  }
};
