const bcrypt = require("bcryptjs");
const { getAdminByEmail, createAdmin, getAdminById } = require("../models/Admin");
const { generateToken } = require("../utils/jwtHelper");
const pool = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role, location_id } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role || !location_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role against allowed roles
    const validRoles = [
      "districtLeader",
      "sectorLeader",
      "cellLeader",
      "villageLeader",
    ];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Validate the location_id against its role
    const locationValid = await validateLocation(location_id, role);
    if (!locationValid) {
      return res.status(400).json({
        message: `Invalid location for the role ${role}. Please select a valid location.`,
      });
    }

    // Check if admin with this email already exists
    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password and create a new admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await createAdmin({
      username,
      email,
      password: hashedPassword,
      role,
      location_id,
    });

    // Generate JWT token for the admin
    const tokenData = {
      id: newAdmin.id,
      role: newAdmin.role,
      location_id: newAdmin.location_id,
    };

    const token = generateToken(tokenData);

    // Respond with the created admin and token
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

// Helper function to validate location_id for a role
const validateLocation = async (location_id, role) => {
  // Map role to allowable location levels
  const levelMap = {
    districtLeader: "district",
    sectorLeader: "sector",
    cellLeader: "cell",
    villageLeader: "village",
  };

  const level = levelMap[role];
  if (!level) return false;

  // Query to validate location
  const query = `
    SELECT id 
    FROM locations 
    WHERE id = ? 
      AND level = ?
  `;

  try {
    const [result] = await pool.query(query, [location_id, level]);
    return result.length > 0;
  } catch (error) {
    console.error("Error validating location:", error);
    return false;
  }
};



// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch admin by email
    const admin = await getAdminByEmail(email);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check password validity
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate role
    if (
      !["districtLeader", "sectorLeader", "cellLeader", "villageLeader"].includes(admin.role)
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: Unauthorized role" });
    }

    // Generate JWT token for admin
    const tokenData = {
      id: admin.id,
      role: admin.role,
      location_id: admin.location_id,
    };

    const token = generateToken(tokenData);

    // Respond with admin details and token
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

exports.adminChangeUserLocation = async (req, res) => {
  const { id } = req.params; // User ID
  const { location_id } = req.body; // New Location ID
  const adminRole = req.user.role;
  const adminLocationId = req.user.location_id;

  try {
    // Check if the location exists
    const location = await getLocationById(location_id);
    if (!location) {
      return res.status(400).json({ message: "Invalid location specified." });
    }

    // Check if the admin has permissions to assign this location
    const canAssign = await validateAdminLocationScope(
      adminRole,
      adminLocationId,
      location_id
    );
    if (!canAssign) {
      return res.status(403).json({
        message: "You do not have permission to assign this location.",
      });
    }

    // Update the user's location
    const updatedUser = await updateUser(id, { location_id });
    res
      .status(200)
      .json({
        message: "User's location updated successfully.",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Error updating user's location:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Helper function for admin scope validation
const validateAdminLocationScope = async (
  adminRole,
  adminLocationId,
  targetLocationId
) => {
  const targetLocation = await getLocationById(targetLocationId);
  if (!targetLocation) return false;

  switch (adminRole) {
    case "districtLeader":
      return (
        targetLocation.level === "district" ||
        targetLocation.parent_id === adminLocationId
      );
    case "sectorLeader":
      return (
        targetLocation.level === "sector" ||
        targetLocation.parent_id === adminLocationId
      );
    case "cellLeader":
      return (
        targetLocation.level === "cell" ||
        targetLocation.parent_id === adminLocationId
      );
    case "villageLeader":
      return (
        targetLocation.level === "village" &&
        targetLocation.parent_id === adminLocationId
      );
    default:
      return false;
  }
};
// Get current admin details
// adminController.js

exports.getCurrentAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;  // The ID from the JWT token

    // Get the admin from the database
    const admin = await getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Send back the admin details
    res.status(200).json({
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        location_id: admin.location_id,
      },
    });
  } catch (error) {
    console.error("Error fetching current admin:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





