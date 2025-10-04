const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// Register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username, // ✅ same as schema
      email: req.body.email,
      password: req.body.password,
    });

    const savedUser = await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: savedUser._id },
      SECRET,
      { expiresIn: "3d" }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
