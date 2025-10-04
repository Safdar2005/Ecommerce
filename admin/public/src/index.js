import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLogin } from "./pages/AdminLogin";
import { Orders } from "./pages/Orders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login Page */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Admin Orders Page */}
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
