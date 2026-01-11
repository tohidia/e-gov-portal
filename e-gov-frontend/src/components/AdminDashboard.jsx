import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    submitted: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/admin/requests"); // ✅ مسیر صحیح
        const data = res.data;

        const approved = data.filter((r) => r.status === "Approved").length;
        const rejected = data.filter((r) => r.status === "Rejected").length;
        const submitted = data.filter((r) => r.status === "Submitted").length;

        setStats({
          total: data.length,
          approved,
          rejected,
          submitted,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-3xl shadow-lg border border-indigo-200 mt-8">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">
        📊 Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-green-500 text-white rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold">Approved</h3>
          <p className="text-4xl font-bold mt-2">{stats.approved}</p>
        </div>

        <div className="bg-red-500 text-white rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold">Rejected</h3>
          <p className="text-4xl font-bold mt-2">{stats.rejected}</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold">Submitted</h3>
          <p className="text-4xl font-bold mt-2">{stats.submitted}</p>
        </div>

        <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold">Total Requests</h3>
          <p className="text-4xl font-bold mt-2">{stats.total}</p>
        </div>
      </div>
    </div>
  );
}
