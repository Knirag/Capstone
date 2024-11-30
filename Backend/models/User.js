const { v4: uuidv4 } = require("uuid");
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
  const id = uuidv4();
  await pool.query(
    `INSERT INTO users (id, username, email, phone_number, age, password, location_id, home_address) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      username,
      email,
      phone_number,
      age,
      password,
      location_id,
      home_address,
    ]
  );

  const [userResult] = await pool.query(
    "SELECT id, username, email, phone_number, age, location_id, home_address FROM users WHERE id = ?",
    [id]
  );

  return userResult[0];
};


// Update user profile
const updateUser = async (id, fields) => {
  const fieldKeys = Object.keys(fields).filter(
    (key) => fields[key] !== undefined
  );
  const fieldValues = fieldKeys.map((key) => fields[key]);

  const query = `
    UPDATE users 
    SET ${fieldKeys.map((key) => `${key} = ?`).join(", ")} 
    WHERE id = ?`;

  await pool.query(query, [...fieldValues, id]);

  const [updatedUser] = await pool.query(
    "SELECT id, username, email, phone_number, age, location_id, home_address FROM users WHERE id = ?",
    [id]
  );

  return updatedUser[0];
};

const getUsersByLocation = async (locationId) => {
  const query = `
    SELECT push_token 
    FROM users 
    WHERE location_id = ? AND push_token IS NOT NULL
  `;
  const [results] = await pool.query(query, [locationId]);
  return results.map((row) => row.push_token);
};
// Confirm attendance for an event
const confirmAttendance = async (req, res) => {
  const userId = req.user.id; // Assuming `req.user.id` is set by auth middleware
  const eventId = req.params.eventId; // Event ID passed in the route

  try {
    // Check if the user is already registered for the event
    const [existingRecord] = await pool.query(
      "SELECT * FROM user_events WHERE user_id = ? AND event_id = ?",
      [userId, eventId]
    );

    if (existingRecord.length === 0) {
      return res.status(404).json({ message: "User is not registered for this event" });
    }

    // Update the attended status to 1 (confirmed)
    await pool.query(
      "UPDATE user_events SET attended = 1 WHERE user_id = ? AND event_id = ?",
      [userId, eventId]
    );

    return res.status(200).json({ message: "Attendance confirmed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  getUsersByLocation,
};
