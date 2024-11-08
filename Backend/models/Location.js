const pool = require("../config/db");

// Retrieve all locations
const getLocations = async () => {
  const result = await pool.query(
    "SELECT * FROM locations ORDER BY district, sector, cell, village, address"
  );
  return result.rows;
};

// Add new location (optional, if you need to add new locations)
const addLocation = async ({ district, sector, cell, village, address }) => {
  const result = await pool.query(
    `INSERT INTO locations (district, sector, cell, village) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [district, sector, cell, village, address]
  );
  return result.rows[0];
};

module.exports = { getLocations, addLocation };
