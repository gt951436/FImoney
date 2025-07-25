const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header is missing!");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token is missing!");
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).send("invalid token!");
  }
};
