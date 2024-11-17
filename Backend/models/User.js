const pool = require("../config/db");

// Get user by email
const getUserByEmail = async (email) => {
  const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return result[0];
};

// Create a new user
const createUser = async ({
  username,
  email,
  phone_number,
  age,
  password,
  location_id,
  home_address,
}) => {
  const [result] = await pool.query(
    `INSERT INTO users (username, email, phone_number, age, password, location_id, home_address) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [username, email, phone_number, age, password, location_id, home_address]
  );
  return result.insertId;
};

// Update user profile
const updateUser = async (
  id,
  { username, email, phone_number, age, location_id, home_address }
) => {
  await pool.query(
    `UPDATE users 
     SET username = ?, email = ?, phone_number = ?, age = ?, location_id = ?, home_address = ? 
     WHERE id = ?`,
    [username, email, phone_number, age, location_id, home_address, id]
  );
  return { id, username, email, phone_number, age, location_id, home_address };
};

module.exports = { getUserByEmail, createUser, updateUser };
