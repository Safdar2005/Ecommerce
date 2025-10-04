import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch orders! Maybe unauthorized.");
      }
    };

    fetchOrders();
  }, []);

  const handleMarkDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Delivered" } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update order status.");
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete order.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1">No orders found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="orders table">
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Order ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>User</TableCell>
                <TableCell sx={{ color: "#fff" }}>Products</TableCell>
                <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                <TableCell sx={{ color: "#fff" }}>Shipping</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o._id}>
                  <TableCell>{o._id}</TableCell>
                  <TableCell>{o.userId?.username || o.userId?.email}</TableCell>
                  <TableCell>
                    {o.products.map((p, i) => (
                      <div key={i}>
                        ID: {p.productId} | Qty: {p.quantity}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>${o.totalAmount}</TableCell>
                  <TableCell>
                    {o.shippingInfo?.name} <br />
                    {o.shippingInfo?.address} <br />
                    {o.shippingInfo?.phone}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={o.status || "Pending"}
                      color={o.status === "Delivered" ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell>
                    {o.status !== "Delivered" && (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => handleMarkDelivered(o._id)}
                        sx={{ mb: 1 }}
                      >
                        Mark Delivered
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(o._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
