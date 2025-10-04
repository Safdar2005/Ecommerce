const router = require('express').Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.user = user;
    next();
  });
};

// POST /api/orders
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log("👉 New Order Request:", req.body);

    const newOrder = new Order({
      userId: req.user.id,  // ✅ matches JWT payload!
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      shippingInfo: req.body.shippingInfo,
    });

    const savedOrder = await newOrder.save();
    console.log("✅ Order saved:", savedOrder);

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Failed to place order:", err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

module.exports = router;
