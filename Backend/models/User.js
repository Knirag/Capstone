const pool = require("../config/db");

// Get user by username
const getUserByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

// Create new user
const createUser = async ({
  username,
  email,
  phone_number,
  password,
  age,
  location_id,
}) => {
  const [result] = await pool.query(
    `INSERT INTO users (username, email, phone_number, password, age, location_id) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [username, email, phone_number, password, age, location_id]
  );

  // Fetch the newly created user by using its insertId
  const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [
    result.insertId,
  ]);
  return userRows[0];
};

module.exports = { getUserByUsername, createUser };
