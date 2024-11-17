const bcrypt = require("bcryptjs");
const { getAdminByEmail, createAdmin } = require("../models/Admin");
const { generateToken } = require("../utils/jwtHelper");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role, location_id } = req.body;

    console.log("Signup input:", req.body);

    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await createAdmin({
      username,
      email,
      password: hashedPassword,
      role,
      location_id,
    });

    console.log("New admin created:", newAdmin);

    // Generate token with complete admin data
    const tokenData = {
      id: newAdmin.id,
      role: newAdmin.role,
      location_id: newAdmin.location_id,
    };

    console.log("Generating token with data:", tokenData);
    const token = generateToken(tokenData);

    res.status(201).json({
      token,
      admin: {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
        location_id: newAdmin.location_id,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await getAdminByEmail(email);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token with complete admin data
    const tokenData = {
      id: admin.id,
      role: admin.role,
      location_id: admin.location_id,
    };

    console.log("Generating token with data:", tokenData);
    const token = generateToken(tokenData);

    // Send response without sensitive data
    const adminResponse = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      location_id: admin.location_id,
    };

    res.json({ admin: adminResponse, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
