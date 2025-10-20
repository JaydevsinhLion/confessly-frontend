import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token → show welcome screen
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    // If logged in → load dashboard data
    setIsLoggedIn(true);
    API.get("/dashboard")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🌙 Loader while fetching
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A1A3C] text-white">
        <p className="text-gold font-display text-xl animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );

  // 🟡 Step 1: Show Welcome Page if not logged in
  if (!isLoggedIn) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-confessly text-white px-6 text-center">
        <div className="max-w-lg p-10 rounded-2xl shadow-gold border border-[#D4AF37] bg-[#051225]">
          <h1 className="text-3xl font-display text-gold mb-4">
            Welcome to Confessly Admin
          </h1>
          <p className="text-textSecondary mb-8 font-body">
            Manage confessions, feedback, and user activity.  
            Please register your first admin or log in to continue.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/admin/register")}
              className="px-6 py-2 bg-[#D4AF37] text-[#051225] font-semibold rounded hover:bg-[#f5d77a] transition-all duration-300 shadow-glow"
            >
              Register as New Admin
            </button>
            <button
              onClick={() => navigate("/admin/login")}
              className="px-6 py-2 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-semibold rounded hover:bg-[#D4AF37] hover:text-[#051225] transition-all duration-300"
            >
              Login as Existing Admin
            </button>
          </div>
        </div>

        <footer className="mt-12 text-sm text-textSecondary">
          © {new Date().getFullYear()} Confessly Admin Panel. All rights reserved.
        </footer>
      </section>
    );
  }

  // 🧭 Step 2: If logged in → Show Dashboard Data
  if (!data)
    return (
      <div className="p-10 text-center text-white bg-gradient-confessly min-h-screen">
        <p className="text-gold font-display text-xl">Fetching data...</p>
      </div>
    );

  return (
    <div className="p-10 min-h-screen bg-gradient-confessly text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-display text-gold">Admin Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("adminUser");
            navigate("/admin/login");
          }}
          className="px-4 py-2 bg-transparent border border-[#D4AF37] text-[#D4AF37] rounded hover:bg-[#D4AF37] hover:text-[#051225] transition-all duration-300"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(data.stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-[#051225] text-center rounded-lg p-4 border border-[#D4AF37] hover:shadow-glow transition-all"
          >
            <h2 className="text-xl capitalize text-gold">{key}</h2>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-12 mb-4 text-gold font-display">
        Recent Confessions
      </h2>

      <div className="space-y-4">
        {data.recent_confessions.map((c) => (
          <div
            key={c._id}
            className="bg-[#0A1A3C] rounded-lg p-4 border border-[#D4AF37] hover:shadow-glow transition-all"
          >
            <p className="text-sm text-textSecondary italic">
              {c.text || "No content"}
            </p>
            <p className="text-xs mt-1 text-gold">
              {new Date(c.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
