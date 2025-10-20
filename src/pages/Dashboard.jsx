import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [reports, setReports] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    Promise.all([
      API.get("/dashboard"),
      API.get("/feedback"),
      API.get("/reports"),
      API.get("/all"),
      API.get("/health"),
    ])
      .then(([dashRes, fbRes, repRes, admRes, healthRes]) => {
        setData(dashRes.data.data);
        setFeedbacks(fbRes.data.data || []);
        setReports(repRes.data.data || []);
        setAdmins(admRes.data.data || []);
        setHealth(healthRes.data.data || null);
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
        setIsLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🌙 Loader
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A1A3C] text-white">
        <p className="text-gold font-display text-xl animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );

  // 🟡 Show welcome if not logged in
  if (!isLoggedIn) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-confessly text-white px-6 text-center">
        <div className="max-w-lg p-10 rounded-2xl shadow-gold border border-[#D4AF37] bg-[#051225]">
          <h1 className="text-3xl font-display text-gold mb-4">
            Welcome to Confessly Admin
          </h1>
          <p className="text-textSecondary mb-8 font-body">
            Manage confessions, feedback, reports, and users.
            <br />
            Register your first admin or log in to continue.
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

  // 🧭 Logged-in dashboard
  if (!data)
    return (
      <div className="p-10 text-center text-white bg-gradient-confessly min-h-screen">
        <p className="text-gold font-display text-xl">Fetching data...</p>
      </div>
    );

  return (
    <div className="p-10 min-h-screen bg-gradient-confessly text-white">
      {/* Header */}
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

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
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

      {/* Recent Confessions */}
      <section>
        <h2 className="text-2xl mb-4 text-gold font-display">
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
      </section>

      {/* Feedback Section */}
      <section className="mt-14">
        <h2 className="text-2xl mb-4 text-gold font-display">Recent Feedback</h2>
        <div className="space-y-3">
          {feedbacks.length > 0 ? (
            feedbacks.slice(0, 5).map((f) => (
              <div
                key={f._id}
                className="bg-[#051225] p-3 rounded border border-[#D4AF37] text-sm text-textSecondary hover:shadow-glow transition"
              >
                <p className="text-white italic">"{f.message}"</p>
                <p className="text-xs text-gold mt-1">
                  {new Date(f.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-textSecondary italic">No feedback yet.</p>
          )}
        </div>
      </section>

      {/* Reports Section */}
      <section className="mt-14">
        <h2 className="text-2xl mb-4 text-gold font-display">User Reports</h2>
        {reports.length > 0 ? (
          reports.slice(0, 5).map((r) => (
            <div
              key={r._id}
              className="bg-[#0A1A3C] p-4 rounded-lg border border-[#D4AF37] mb-3 hover:shadow-glow transition"
            >
              <p className="text-white text-sm">{r.reason || "No reason given"}</p>
              <p className="text-xs text-gold mt-1">
                {new Date(r.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-textSecondary italic">No reports found.</p>
        )}
      </section>

      {/* Admins Section */}
      <section className="mt-14">
        <h2 className="text-2xl mb-4 text-gold font-display">Admin Accounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#D4AF37] rounded-lg text-sm">
            <thead className="bg-[#051225]">
              <tr>
                <th className="px-4 py-2 text-left text-gold">Username</th>
                <th className="px-4 py-2 text-left text-gold">Email</th>
                <th className="px-4 py-2 text-left text-gold">Role</th>
                <th className="px-4 py-2 text-left text-gold">Created At</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a._id} className="border-t border-[#D4AF37] hover:bg-[#0A1A3C]">
                  <td className="px-4 py-2">{a.username}</td>
                  <td className="px-4 py-2">{a.email}</td>
                  <td className="px-4 py-2 text-gold">{a.role}</td>
                  <td className="px-4 py-2 text-textSecondary">
                    {new Date(a.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Health Section */}
      <section className="mt-14">
        <h2 className="text-2xl mb-4 text-gold font-display">System Health</h2>
        {health ? (
          <div className="bg-[#051225] p-6 rounded-lg border border-[#D4AF37] shadow-soft">
            <p className="text-textSecondary">
              <span className="text-gold">Database Size:</span>{" "}
              {health.database_size_MB} MB
            </p>
            <p className="text-textSecondary mt-1">
              <span className="text-gold">Collections:</span>{" "}
              {health.collections.join(", ")}
            </p>
            <p className="text-textSecondary mt-1">
              <span className="text-gold">Server Time:</span>{" "}
              {new Date(health.server_time).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-textSecondary italic">Health data unavailable.</p>
        )}
      </section>

      <footer className="mt-16 text-center text-sm text-textSecondary">
        © {new Date().getFullYear()} Confessly Admin. Built with 🖤 by Jaydevsinh Gohil.
      </footer>
    </div>
  );
}
