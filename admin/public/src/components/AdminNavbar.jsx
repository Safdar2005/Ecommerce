import React from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

export const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};
