const pool = require("../config/db");

// Get admin by username
const getAdminByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM admins WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

// Create a new admin
const createAdmin = async ({ username, email, password, role = "admin" }) => {
  const result = await pool.query(
    `INSERT INTO admins (username, email, password, role) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [username, email, password, role]
  );
  return result.rows[0];
};

module.exports = { getAdminByUsername, createAdmin };
