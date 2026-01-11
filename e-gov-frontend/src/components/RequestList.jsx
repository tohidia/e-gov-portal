import { useEffect, useState } from "react";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // فقط اگر مسیر ادمین است
    fetch("http://localhost:5000/api/admin/requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requests List</h2>

      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Citizen Name</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Fee</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{r.id}</td>
              <td className="p-3">{r.citizen_name}</td>
              <td className="p-3">{r.service_name}</td>
              <td className="p-3">{r.department_name}</td>
              <td className="p-3">{r.status}</td>
              <td className="p-3">${r.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
