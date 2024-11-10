const pool = require("../config/db");

exports.getLocations = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM locations ORDER BY district, sector, cell, village, Adresss"
    );
    res.status(200).json({ locations: rows });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving locations", error });
  }
};

