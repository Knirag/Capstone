const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAdminByUsername, createAdmin } = require("../models/Admin");
require("dotenv").config();

exports.adminSignup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingAdmin = await getAdminByUsername(username);
    if (existingAdmin.length > 0)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await createAdmin({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await getAdminByUsername(username);
    if (admin.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    const isPasswordValid = await bcrypt.compare(password, admin[0].password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    // Generate JWT token with role and ID
    const token = jwt.sign(
      { id: admin[0].id, role: admin[0].role, username: admin[0].username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Middleware to verify admin role
exports.verifyAdminRole = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin" && role !== "superadmin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
