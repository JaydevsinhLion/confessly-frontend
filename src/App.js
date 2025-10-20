import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegister from "./components/admin/AdminRegister";
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./pages/Dashboard";

/**
 * 🌐 App — Confessly Frontend Entry Point
 * Displays Dashboard first by default, with clean routing for admin actions
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0A] font-body text-textPrimary">
        <Routes>
          {/* Default route → Dashboard (Welcome Page + Analytics) */}
          <Route path="/" element={<Dashboard />} />

          {/* Admin Actions */}
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-confessly text-center">
                <h1 className="text-5xl font-display text-gold mb-4">404</h1>
                <p className="text-textSecondary mb-6">
                  The page you’re looking for doesn’t exist.
                </p>
                <a
                  href="/"
                  className="px-6 py-2 bg-gold text-dark rounded font-semibold hover:bg-[#f5d77a] transition-all duration-300"
                >
                  Return to Dashboard
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
