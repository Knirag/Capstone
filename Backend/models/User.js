const pool = require("../config/db");

// Get user by username
const getUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
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
  const result = await pool.query(
    `INSERT INTO users (username, email, phone_number, password, age, location_id) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [username, email, phone_number, password, age, location_id]
  );
  return result.rows[0];
};

module.exports = { getUserByUsername, createUser };
