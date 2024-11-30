const { getLocationById } = require("../models/Location");

exports.validateAdminAccessToLocation = async (
  adminRole,
  adminLocationId,
  targetLocationId
) => {
  // If the admin role allows managing the target location, return true
  const hierarchyMap = {
    districtLeader: ["district", "sector", "cell", "village"],
    sectorLeader: ["sector", "cell", "village"],
    cellLeader: ["cell", "village"],
    villageLeader: ["village"],
  };

  const targetLocation = await getLocationById(targetLocationId);
  const adminLocation = await getLocationById(adminLocationId);

  if (!targetLocation || !adminLocation) {
    return false;
  }

  const adminAllowedLevels = hierarchyMap[adminRole] || [];
  return (
    adminAllowedLevels.includes(targetLocation.level) &&
    targetLocation.path.includes(adminLocation.id)
  );
};
