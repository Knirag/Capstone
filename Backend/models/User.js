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

const updateUserPushToken = async (userId, push_token) => {
  await pool.query("UPDATE users SET push_token = ? WHERE id = ?", [
    push_token,
    userId,
  ]);
};
const getUsersByLocation = async (locationId) => {
  const query = `
    WITH RECURSIVE LocationHierarchy AS (
      SELECT id
      FROM locations
      WHERE id = ?
      UNION ALL
      SELECT l.id
      FROM locations l
      INNER JOIN LocationHierarchy lh ON lh.id = l.parent_id
    )
    SELECT u.id, u.push_token
    FROM users u
    JOIN LocationHierarchy lh ON u.location_id = lh.id;
  `;

  const [users] = await pool.query(query, [locationId]);
  return users;
};


module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  updateUserPushToken,
  getUsersByLocation,
};
