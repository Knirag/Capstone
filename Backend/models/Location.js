const pool = require("../config/db");

// Retrieve all locations
const getLocations = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM locations ORDER BY district, sector, cell, village, address"
  );
  return rows;
};

// Add new location (optional, if you need to add new locations)
const addLocation = async ({ district, sector, cell, village, adresss }) => {
  const [result] = await pool.query(
    `INSERT INTO locations (district, sector, cell, village, adresss) 
     VALUES (?, ?, ?, ?, ?)`,
    [district, sector, cell, village, address]
  );

  // Retrieve the newly added location
  const [locationRows] = await pool.query(
    "SELECT * FROM locations WHERE id = ?",
    [result.insertId]
  );
  return locationRows[0];
};

module.exports = { getLocations, addLocation };
