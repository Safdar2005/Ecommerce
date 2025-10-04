// backend/routes/contactRoutes.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  // Save to database or log
  console.log('Contact Form Received:', { name, email, message });

  res.status(200).json({ success: true, msg: 'Message received' });
});

module.exports = router;
