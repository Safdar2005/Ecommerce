import React, { useEffect, useState } from "react";
import axios from "axios";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert("Not authorized or error fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Admin Orders</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Products</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>
                {order.products.map((p, i) => (
                  <div key={i}>
                    {p.productId} - Qty: {p.quantity}
                  </div>
                ))}
              </td>
              <td>${order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
