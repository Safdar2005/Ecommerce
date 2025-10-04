const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ Import your routes
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const adminRoute = require('./routes/admin');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use('/api/auth', authRoute);
app.use('/api/orders', orderRoute);   // ✅ ONE TIME ONLY
app.use('/api/admin', adminRoute);

// ✅ Health check route (optional)
app.get('/', (req, res) => {
  res.send('🚀 Backend API is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
