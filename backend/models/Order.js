const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // ✅ best practice
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingInfo: {
      name: { type: String },
      address: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
