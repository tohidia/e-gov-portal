import React, { useEffect, useState } from "react";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 Fetch all requests from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch requests");
        setLoading(false);
      });
  }, []);

  // 🔴 Delete a request
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      await fetch(`http://localhost:3000/api/requests/${id}`, {
        method: "DELETE",
      });
      setRequests(requests.filter((r) => r.id !== id));
    } catch {
      alert("Error deleting request");
    }
  };

  // 🟡 Update request status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setRequests(requests.map((r) => (r.id === id ? updated : r)));
    } catch {
      alert("Error updating status");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📋 Requests List</h1>

      <div className="overflow-x-auto shadow-md rounded-xl bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Citizen Name</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Fee</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{r.id}</td>
                <td className="py-3 px-4">{r.citizen_name || "—"}</td>
                <td className="py-3 px-4">{r.service_name}</td>
                <td className="py-3 px-4">
                  <select
                    value={r.status}
                    onChange={(e) => handleStatusChange(r.id, e.target.value)}
                    className="border rounded-lg px-2 py-1"
                  >
                    <option>Submitted</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td className="py-3 px-4">${r.fee}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsPage;

