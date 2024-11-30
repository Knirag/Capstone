const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Populate req.user with decoded token payload

    console.log("Admin Middleware: req.user =", req.user);

    const allowedRoles = ["districtLeader", "sectorLeader", "cellLeader", "villageLeader"];
    const { role, location_id } = req.user;

    if (!allowedRoles.includes(role)) {
      console.error("Access denied: Invalid admin role", role);
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    if (!location_id) {
      console.error("Missing location_id for admin");
      return res.status(403).json({
        message: "Access denied: Missing location information",
      });
    }

    next();
  } catch (error) {
    console.error("Token validation error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = adminMiddleware;
