const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

// Get admin by email
const getAdminByEmail = async (email) => {
  const [result] = await pool.query("SELECT * FROM admins WHERE email = ?", [
    email,
  ]);
  return result[0];
};

// Create a new admin
const createAdmin = async ({
  username,
  email,
  password,
  role,
  location_id,
}) => {
  const id = uuidv4();
  await pool.query(
    `INSERT INTO admins (id, username, email, password, role, location_id) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, username, email, password, role, location_id]
  );

  const [adminResult] = await pool.query(
    "SELECT id, username, email, role, location_id FROM admins WHERE id = ?",
    [id]
  );

  return adminResult[0];
};
const getAdminById = async (id) => {
  const query = "SELECT * FROM admins WHERE id = ?";
  try {
    const [result] = await pool.query(query, [id]);
    return result[0]; // Assuming you're only expecting one result
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    throw new Error("Database query failed");
  }
};

module.exports = { getAdminByEmail, createAdmin, getAdminById };
