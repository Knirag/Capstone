const bcrypt = require("bcryptjs");
const { getUserByEmail, createUser } = require("../models/User");
const { generateToken } = require("../utils/jwtHelper");

exports.signup = async (req, res) => {
  const {
    username,
    email,
    phone_number,
    age,
    password,
    location_id,
    home_address,
  } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    console.log("Existing user:", existingUser); // Debug: Check if user already exists

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

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
    console.log("Created user:", user); // Debug: Confirm user creation

    const token = generateToken({ id: user.id });
    console.log("Generated token:", token); // Debug: Check if token is generated
    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Signup error:", error); // Log error for troubleshooting
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    console.log("User fetched in login:", user); // Debug: Confirm user retrieval

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Wrap user.id in an object for generateToken
    const token = generateToken({ id: user.id });
    console.log("Generated login token:", token); // Debug: Check if login token is generated
    res.json({ user, token });
  } catch (error) {
    console.error("Login error:", error); // Log error for troubleshooting
    res.status(500).json({ message: "Server error", error });
  }
};
