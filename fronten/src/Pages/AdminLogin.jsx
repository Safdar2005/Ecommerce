import React, { useState } from "react";
import axios from "axios";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("adminToken", res.data.token);
        alert("✅ Admin login successful!");
        window.location.href = "/admin/orders";
      } else {
        alert("❌ Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Invalid credentials or server error");
    }
  };

  return (
    <div className="admin-login" style={{ padding: "30px", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
