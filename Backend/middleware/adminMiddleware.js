const adminMiddleware = (req, res, next) => {
  const allowedRoles = ["admin", "district", "sector", "cell", "village"];
  console.log("User Role in Middleware:", req.user?.role); // Debug log

  if (allowedRoles.includes(req.user?.role)) {
    return next();
  }

  return res.status(403).json({ message: "Access denied: Admins only" });
};

module.exports = adminMiddleware;
