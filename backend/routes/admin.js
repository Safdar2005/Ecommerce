const router = require('express').Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// ✅ Admin login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username, isAdmin: true }, SECRET, { expiresIn: "2d" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Admin verify middleware
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;  // ✅ STANDARD
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    if (!user.isAdmin) return res.status(403).json({ message: "Admins only" });
    req.user = user;
    next();
  });
};

// ✅ Get all orders
router.get("/orders", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "username email");
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Mark as Delivered (NEW ROUTE)
router.put("/orders/:id/deliver", verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Delivered";
    await order.save();

    res.status(200).json({ message: "Order marked as delivered" });
  } catch (err) {
    console.error("❌ Error marking delivered:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update order status (Generic)
router.put("/order/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("❌ Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE /api/admin/orders/:id
router.delete("/orders/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
