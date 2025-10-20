import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      // ✅ Backend endpoint: POST /api/admin/login
      const res = await API.post("/login", form);

      // Extract token and admin info from backend response
      const { token, admin } = res.data.data;

      // ✅ Store token + admin details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("adminUser", JSON.stringify(admin));

      // ✅ Navigate to admin dashboard after login
      navigate("/admin/dashboard");
    } catch (err) {
      // Display backend error message or fallback
      const msg = err.response?.data?.error || "Invalid username or password";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A1A3C] text-white">
      <div className="bg-[#051225] p-10 rounded-2xl shadow-lg w-full max-w-md border border-[#D4AF37]">
        <h2 className="text-2xl font-semibold mb-4 text-[#D4AF37]">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-[#0A1A3C] border border-gray-600 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-[#0A1A3C] border border-gray-600 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#D4AF37] text-[#051225] font-semibold rounded hover:bg-[#f5d77a] transition duration-300"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}
      </div>
    </section>
  );
};

export default AdminLogin;
