const jwt = require("jsonwebtoken");
require("dotenv").config(); // load JWT_SECRET

// verify jwt token
function authenticateToken(req, res, next) {
  // get token from header as "Bearer token" in authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    // verify token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
module.exports = authenticateToken;
