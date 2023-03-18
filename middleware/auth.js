const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  try {

    const token = req.headers["token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, "anyspecificKey");
    req.user = decoded;

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;