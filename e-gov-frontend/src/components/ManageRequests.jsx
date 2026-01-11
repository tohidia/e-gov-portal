// ManageRequests.js
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import api from "../api/api";

// export default function ManageRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const loadRequests = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please login again — token missing!");
//         window.location.href = "/login";
//         return;
//       }

//       const res = await api.get("/admin/requests", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", res.data);
//       setRequests(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Error loading requests:", err);

//       if (err.response?.status === 403) {
//         toast.error("Access denied. Admins only!");
//       } else if (err.response?.status === 401) {
//         toast.error("Session expired. Please login again!");
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       } else {
//         toast.error(err.response?.data?.message || "Failed to load requests!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRequests();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await api.patch(
//         `/admin/requests/${id}/approve`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Request Approved!");
//       loadRequests();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to approve request!");
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await api.patch(
//         `/admin/requests/${id}/reject`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.error("Request Rejected!");
//       loadRequests();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to reject request!");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this request?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await api.delete(`/admin/requests/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.info("Request Deleted!");
//       loadRequests();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete request!");
//     }
//   };

//   const filteredRequests = requests.filter((r) =>
//     (r.citizen_name || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl shadow-lg mt-8 border border-indigo-200">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 tracking-wide">
//         Manage Requests
//       </h2>

//       <input
//         type="text"
//         placeholder="Search by citizen name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="block mx-auto border border-gray-300 rounded-xl p-3 mb-6 w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
//       />

//       {loading ? (
//         <p className="text-center text-gray-600 animate-pulse text-lg">Loading...</p>
//       ) : filteredRequests.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">No requests found 😴</p>
//       ) : (
//         <div className="overflow-hidden rounded-3xl shadow-xl border border-indigo-200">
//           <table className="w-full text-center border-collapse overflow-hidden">
//             <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//               <tr className="text-lg">
//                 <th className="py-4">ID</th>
//                 <th>Citizen</th>
//                 <th>Service</th>
//                 <th>Department</th>
//                 <th>Fee</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRequests.map((r) => (
//                 <tr
//                   key={r.id}
//                   className="bg-white hover:bg-indigo-50 transition-all duration-200"
//                 >
//                   <td className="py-3">{r.id}</td>
//                   <td>{r.citizen_name || "Unknown"}</td>
//                   <td>{r.service_name}</td>
//                   <td>{r.department_name}</td>
//                   <td>${r.fee}</td>
//                   <td>
//                     <span
//                       className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
//                         r.status === "Approved"
//                           ? "bg-green-500"
//                           : r.status === "Rejected"
//                           ? "bg-red-500"
//                           : "bg-yellow-500"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </td>
//                   <td className="space-x-2 flex justify-center">
//                     <button
//                       className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow transition duration-200"
//                       onClick={() => handleApprove(r.id)}
//                     >
//                       Approve
//                     </button>

//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow transition duration-200"
//                       onClick={() => handleReject(r.id)}
//                     >
//                       Reject
//                     </button>

//                     <button
//                       className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow transition duration-200"
//                       onClick={() => handleDelete(r.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }





// ManageRequests.jsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

export default function ManageRequests() {
  // State Management
  const [requests, setRequests] = useState([]);      // Array of all requests
  const [loading, setLoading] = useState(true);      // Loading state
  const [searchTerm, setSearchTerm] = useState("");  // Search input value

  /**
   * Fetch all requests from the backend
   * Only accessible to admins
   */
  const loadRequests = async () => {
    setLoading(true);
    try {
      // Get authentication token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again — token missing!");
        window.location.href = "/login";
        return;
      }

      // API call to get all requests (admin endpoint)
      const res = await api.get("/admin/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", res.data);
      
      // Ensure we have an array (safety check)
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading requests:", err);

      // Handle different error types
      if (err.response?.status === 403) {
        toast.error("Access denied. Admins only!");
      } else if (err.response?.status === 401) {
        toast.error("Session expired. Please login again!");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        toast.error(err.response?.data?.message || "Failed to load requests!");
      }
    } finally {
      setLoading(false);
    }
  };

  // Load requests when component mounts
  useEffect(() => {
    loadRequests();
  }, []);

  /**
   * Approve a request
   * Changes status to "Approved"
   */
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/admin/requests/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Request Approved!");
      loadRequests(); // Refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve request!");
    }
  };

  /**
   * Reject a request
   * Changes status to "Rejected"
   */
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/admin/requests/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.error("Request Rejected!"); // Using error toast for visual emphasis
      loadRequests(); // Refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request!");
    }
  };

  /**
   * Delete a request permanently
   * Shows confirmation dialog before deletion
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/admin/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Request Deleted!");
      loadRequests(); // Refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete request!");
    }
  };

  /**
   * Filter requests by citizen name
   * Case-insensitive search
   */
  const filteredRequests = requests.filter((r) =>
    (r.citizen_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl shadow-lg mt-8 border border-indigo-200">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 tracking-wide">
        Manage Requests
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by citizen name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block mx-auto border border-gray-300 rounded-xl p-3 mb-6 w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
      />

      {/* Conditional Rendering */}
      {loading ? (
        // Loading State
        <p className="text-center text-gray-600 animate-pulse text-lg">Loading...</p>
      ) : filteredRequests.length === 0 ? (
        // No Results
        <p className="text-center text-gray-500 text-lg">No requests found 😴</p>
      ) : (
        // Request Table
        <div className="overflow-hidden rounded-3xl shadow-xl border border-indigo-200">
          <table className="w-full text-center border-collapse overflow-hidden">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr className="text-lg">
                <th className="py-4">ID</th>
                <th>Citizen</th>
                <th>Service</th>
                <th>Department</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {filteredRequests.map((r) => (
                <tr
                  key={r.id}
                  className="bg-white hover:bg-indigo-50 transition-all duration-200"
                >
                  <td className="py-3">{r.id}</td>
                  <td>{r.citizen_name || "Unknown"}</td>
                  <td>{r.service_name}</td>
                  <td>{r.department_name}</td>
                  <td>${r.fee}</td>
                  {/* Status Badge with Color Coding */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                        r.status === "Approved"
                          ? "bg-green-500"
                          : r.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  {/* Action Buttons */}
                  <td className="space-x-2 flex justify-center">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow transition duration-200"
                      onClick={() => handleApprove(r.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow transition duration-200"
                      onClick={() => handleReject(r.id)}
                    >
                      Reject
                    </button>

                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow transition duration-200"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}