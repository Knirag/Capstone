// controllers/locationController.js
const pool = require("../config/db");

exports.getLocations = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM locations ORDER BY district, sector, cell, village, address"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving locations", error });
  }
};
