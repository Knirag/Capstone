const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

// Get all locations
const getLocations = async () => {
  const [result] = await pool.query(
    "SELECT id, name, level, parent_id FROM locations ORDER BY level, name"
  );
  return result; // Return all locations
};

// Get a single location by ID
const getLocationById = async (id) => {
  const [result] = await pool.query("SELECT * FROM locations WHERE id = ?", [
    id,
  ]);
  return result[0];
};

// Add a new location
const addLocation = async ({ name, level, parent_id }) => {
  const id = uuidv4(); // Generate a UUID
  await pool.query(
    "INSERT INTO locations (id, name, level, parent_id) VALUES (?, ?, ?, ?)",
    [id, name, level, parent_id]
  );
  return { id, name, level, parent_id }; // Return the UUID instead of insertId
};

// Update an existing location
const updateLocation = async (id, { name, level, parent_id }) => {
  await pool.query(
    "UPDATE locations SET name = ?, level = ?, parent_id = ? WHERE id = ?",
    [name, level, parent_id, id]
  );
  return { id, name, level, parent_id };
};

// Delete a location
const deleteLocation = async (id) => {
  const [result] = await pool.query("DELETE FROM locations WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

// Fetch all child locations within a hierarchy
const getLocationHierarchy = async (id) => {
  const query = `
    WITH RECURSIVE LocationHierarchy AS (
      SELECT id, name, level, parent_id
      FROM locations
      WHERE id = ?
      UNION ALL
      SELECT l.id, l.name, l.level, l.parent_id
      FROM locations l
      INNER JOIN LocationHierarchy lh ON l.parent_id = lh.id
    )
    SELECT * FROM LocationHierarchy ORDER BY level, name;
  `;

  const [result] = await pool.query(query, [id]);
  return result;
};

// Validate if a location belongs to a specific hierarchy
const validateLocationHierarchy = async (adminLocationId, targetLocationId) => {
  const hierarchy = await getLocationHierarchy(adminLocationId);
  return hierarchy.some((location) => location.id === targetLocationId);
};

module.exports = {
  getLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
  getLocationHierarchy,
  validateLocationHierarchy,
};
