import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [reports, setReports] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      .catch((err) => console.error("Dashboard load error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A1A3C] text-white">
        <p className="text-gold font-display text-xl animate-pulse">
          Loading Confessly Dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-confessly text-white flex flex-col">
      {/* 🌟 Hero Section */}
      <header className="text-center py-16 border-b border-[#D4AF37]/30 bg-[#0A1A3C]">
        <h1 className="text-5xl font-display text-gold mb-3">Confessly Admin Dashboard</h1>
        <p className="text-textSecondary max-w-2xl mx-auto font-body">
          The heart of Confessly — a space to monitor activity, insights, and growth.
        </p>
      </header>

      {/* 📊 Key Statistics */}
      {data && (
        <section className="px-8 py-16">
          <h2 className="text-3xl font-display text-gold mb-8 text-center">
            System Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(data.stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-[#051225] text-center rounded-lg p-6 border border-[#D4AF37] hover:shadow-glow transition-all"
              >
                <h3 className="text-lg capitalize text-gold mb-1">{key}</h3>
                <p className="text-4xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 💬 Confessions */}
      <section className="px-8 py-14 bg-[#0A1A3C]/40 border-t border-[#D4AF37]/30">
        <h2 className="text-3xl text-center font-display text-gold mb-6">
          Recent Confessions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {data?.recent_confessions.length > 0 ? (
            data.recent_confessions.map((c) => (
              <div
                key={c._id}
                className="bg-[#051225] p-5 rounded-lg border border-[#D4AF37] hover:shadow-glow transition"
              >
                <p className="italic text-textSecondary">{c.text || "No content"}</p>
                <p className="text-xs text-gold mt-2">
                  {new Date(c.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-textSecondary text-center italic">
              No recent confessions found.
            </p>
          )}
        </div>
      </section>

      {/* 💡 Feedback Section */}
      <section className="px-8 py-14 border-t border-[#D4AF37]/30">
        <h2 className="text-3xl text-center font-display text-gold mb-8">
          Recent Feedback
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {feedbacks.length > 0 ? (
            feedbacks.slice(0, 6).map((f) => (
              <div
                key={f._id}
                className="bg-[#051225] p-4 rounded-lg border border-[#D4AF37] hover:shadow-glow transition"
              >
                <p className="text-white italic">"{f.message}"</p>
                <p className="text-xs text-gold mt-2">
                  {new Date(f.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-textSecondary italic text-center col-span-2">
              No feedback received yet.
            </p>
          )}
        </div>
      </section>

      {/* 🚨 Reports Section */}
      <section className="px-8 py-14 bg-[#0A1A3C]/40 border-t border-[#D4AF37]/30">
        <h2 className="text-3xl text-center font-display text-gold mb-6">
          User Reports
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {reports.length > 0 ? (
            reports.slice(0, 5).map((r) => (
              <div
                key={r._id}
                className="bg-[#051225] p-5 rounded-lg border border-[#D4AF37] hover:shadow-glow transition"
              >
                <p className="text-white text-sm">{r.reason || "No reason provided"}</p>
                <p className="text-xs text-gold mt-1">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-textSecondary italic text-center">
              No reports to show.
            </p>
          )}
        </div>
      </section>

      {/* 👥 Admin Accounts */}
      <section className="px-8 py-14 border-t border-[#D4AF37]/30">
        <h2 className="text-3xl text-center font-display text-gold mb-6">
          Admin Accounts
        </h2>
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="min-w-full border border-[#D4AF37] rounded-lg text-sm">
            <thead className="bg-[#051225]">
              <tr>
                <th className="px-4 py-2 text-left text-gold">Username</th>
                <th className="px-4 py-2 text-left text-gold">Email</th>
                <th className="px-4 py-2 text-left text-gold">Role</th>
                <th className="px-4 py-2 text-left text-gold">Created</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((a) => (
                  <tr key={a._id} className="border-t border-[#D4AF37]/40 hover:bg-[#0A1A3C]">
                    <td className="px-4 py-2">{a.username}</td>
                    <td className="px-4 py-2">{a.email}</td>
                    <td className="px-4 py-2 text-gold">{a.role}</td>
                    <td className="px-4 py-2 text-textSecondary">
                      {new Date(a.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-textSecondary italic">
                    No admin records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ⚙️ Health Section */}
      <section className="px-8 py-14 bg-[#0A1A3C]/40 border-t border-[#D4AF37]/30">
        <h2 className="text-3xl text-center font-display text-gold mb-6">
          System Health Status
        </h2>
        {health ? (
          <div className="max-w-3xl mx-auto bg-[#051225] p-6 rounded-lg border border-[#D4AF37] text-textSecondary">
            <p>
              <span className="text-gold">Database Size:</span> {health.database_size_MB} MB
            </p>
            <p className="mt-1">
              <span className="text-gold">Collections:</span> {health.collections.join(", ")}
            </p>
            <p className="mt-1">
              <span className="text-gold">Server Time:</span>{" "}
              {new Date(health.server_time).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-center text-textSecondary italic">
            System health data unavailable.
          </p>
        )}
      </section>

      {/* 🪶 Footer */}
      <footer className="mt-12 py-10 border-t border-[#D4AF37]/30 text-center text-textSecondary text-sm bg-[#051225]">
        <p>
          © {new Date().getFullYear()} <span className="text-gold">Confessly Admin Panel</span>
          <br />
          Built with 🖤 by <span className="text-gold">Jaydevsinh Gohil</span>.
        </p>
      </footer>
    </div>
  );
}
