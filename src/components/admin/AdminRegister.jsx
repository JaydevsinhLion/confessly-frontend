import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
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
      // ✅ Updated endpoint path — backend is /api/admin/register
      const res = await API.post("/register", form);
      setMessage(res.data.message);

      // redirect to login page after success
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A1A3C] text-white">
      <div className="bg-[#051225] p-10 rounded-2xl shadow-lg w-full max-w-md border border-[#D4AF37]">
        <h2 className="text-2xl font-semibold mb-4 text-[#D4AF37]">
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-[#0A1A3C] border border-gray-600 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
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
            {loading ? "Creating..." : "Register Admin"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}
      </div>
    </section>
  );
};

export default AdminRegister;
