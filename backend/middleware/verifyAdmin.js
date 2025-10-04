const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "SECRET_KEY";

const verifyAdmin = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    req.user = user;
    next();
  });
};

module.exports = verifyAdmin;
