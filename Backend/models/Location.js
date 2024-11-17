const pool = require("../config/db");

const getLocations = async () => {
  const [result] = await pool.query(
    "SELECT * FROM locations ORDER BY level, name"
  );
  return result;
};

const getLocationById = async (id) => {
  const [result] = await pool.query("SELECT * FROM locations WHERE id = ?", [
    id,
  ]);
  return result[0];
};

const addLocation = async ({ name, level, parent_id }) => {
  const [result] = await pool.query(
    "INSERT INTO locations (name, level, parent_id) VALUES (?, ?, ?)",
    [name, level, parent_id]
  );
  return { id: result.insertId, name, level, parent_id };
};

const updateLocation = async (id, { name, level, parent_id }) => {
  await pool.query(
    "UPDATE locations SET name = ?, level = ?, parent_id = ? WHERE id = ?",
    [name, level, parent_id, id]
  );
  return { id, name, level, parent_id };
};

const deleteLocation = async (id) => {
  const [result] = await pool.query("DELETE FROM locations WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
};
