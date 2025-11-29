// import { useEffect, useState } from "react";
// import api from "../api/api"; // فایل axios که interceptor JWT دارد
// import { toast } from "react-toastify";

// export default function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🧩 دریافت داده‌ها از سرور
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       // دریافت کاربران
//       const usersRes = await api.get("/admin/users");
//       setUsers(usersRes.data);

//       // دریافت درخواست‌ها
//       const requestsRes = await api.get("/admin/requests");
//       setRequests(requestsRes.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       toast.error(err.response?.data?.message || "❌ Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-indigo-600">Admin Dashboard</h1>

//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Users</h2>
//         <table className="min-w-full bg-white border rounded-lg shadow">
//           <thead>
//             <tr className="bg-indigo-100">
//               <th className="p-2 border">ID</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id} className="text-center">
//                 <td className="p-2 border">{u.id}</td>
//                 <td className="p-2 border">{u.name}</td>
//                 <td className="p-2 border">{u.email}</td>
//                 <td className="p-2 border">{u.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">Requests</h2>
//         <table className="min-w-full bg-white border rounded-lg shadow">
//           <thead>
//             <tr className="bg-indigo-100">
//               <th className="p-2 border">ID</th>
//               <th className="p-2 border">User</th>
//               <th className="p-2 border">Service ID</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((r) => (
//               <tr key={r.id} className="text-center">
//                 <td className="p-2 border">{r.id}</td>
//                 <td className="p-2 border">{r.user_name}</td>
//                 <td className="p-2 border">{r.service_id}</td>
//                 <td className="p-2 border">{r.status}</td>
//                 <td className="p-2 border">{new Date(r.created_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserAPI from "../api/User.js";
import RequestAPI from "../api/Request.js";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, requestsData] = await Promise.all([
          UserAPI.getAll(),
          RequestAPI.getAll(),
        ]);
        setUsers(usersData);
        setRequests(requestsData);
      } catch (err) {
        toast.error(err.message || "❌ Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-indigo-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Requests</h2>
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-indigo-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Service ID</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.user_name}</td>
                <td className="p-2 border">{r.service_id}</td>
                <td className="p-2 border">{r.status}</td>
                <td className="p-2 border">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
