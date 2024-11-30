const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure required fields are valid
    if (!decoded.id || !decoded.location_id) {
      return res.status(401).json({ message: "Invalid token data" });
    }

    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
