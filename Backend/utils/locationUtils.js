// utils/locationUtils.js

const { validateLocationHierarchy } = require("../models/Location");

// A utility function to check if a location can be created based on role and hierarchy
async function validateLocationCreation(
  targetLocationId,
  role,
  adminLocationId
) {
  if (!targetLocationId || !adminLocationId) {
    return false;
  }

  // Validate the hierarchy of the target location
  const isValidHierarchy = await validateLocationHierarchy(
    adminLocationId,
    targetLocationId
  );

  if (!isValidHierarchy) {
    return false;
  }

  // Define role-based permissions for event creation
  const allowedRoles = {
    districtLeader: ["sector", "cell", "village"],
    sectorLeader: ["cell", "village"],
    cellLeader: ["village"],
  };

  const allowedLevels = allowedRoles[role] || [];
  const targetLocationLevel = await getLocationLevel(targetLocationId); // Fetch the level for the target location

  // Check if the target location's level is allowed for the role
  return allowedLevels.includes(targetLocationLevel);
}

module.exports = {
  validateLocationCreation,
};
