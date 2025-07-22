const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authToken.split(" ")[1];
    const decodedToken = jwt.verify(token, "password"); 
    req.user = decodedToken; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authCheck;
