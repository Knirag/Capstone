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
  // First, insert the admin
  const [insertResult] = await pool.query(
    `INSERT INTO admins (username, email, password, role, location_id) 
     VALUES (?, ?, ?, ?, ?)`,
    [username, email, password, role, location_id]
  );

  // Then fetch the created admin data
  const [adminResult] = await pool.query(
    "SELECT id, username, email, role, location_id FROM admins WHERE id = ?",
    [insertResult.insertId]
  );

  return adminResult[0];
};

module.exports = { getAdminByEmail, createAdmin };
