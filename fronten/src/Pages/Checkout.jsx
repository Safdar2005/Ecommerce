import React, { useContext, useState } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

export const Checkout = () => {
  const { cartItems, all_product } = useContext(ShopContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });

  // ✅ Get JWT token from localStorage
  const token = localStorage.getItem('token');

  const orderProducts = all_product.filter(
    (product) => cartItems[product.id] > 0
  );

  const getTotal = () => {
    return orderProducts.reduce(
      (total, product) =>
        total + product.new_price * cartItems[product.id],
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      alert("❌ You must be logged in to place an order!");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        {
          products: orderProducts.map((p) => ({
            productId: p.id,
            quantity: cartItems[p.id],
          })),
          totalAmount: getTotal(),
          shippingInfo: shippingInfo,
        },
        {
headers: {
  Authorization: `Bearer ${token}`,
},
        }
      );

      console.log(response.data);
      alert('✅ Order placed successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to place order!');
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-form">
        <input
          type="text"
          placeholder="Name"
          value={shippingInfo.name}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone"
          value={shippingInfo.phone}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, phone: e.target.value })
          }
        />
      </div>

      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{cartItems[product.id]}</td>
              <td>${product.new_price}</td>
              <td>${product.new_price * cartItems[product.id]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${getTotal()}</h3>

      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};
