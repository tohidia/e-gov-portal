// // src/api/requests.js
// const API_URL = "http://localhost:3000/api/requests";

// // 🟢 گرفتن همه درخواست‌ها
// export const getRequests = async () => {
//   const res = await fetch(API_URL);
//   return res.json();
// };

// // 🟡 تأیید درخواست
// export const approveRequest = async (id) => {
//   const res = await fetch(`${API_URL}/${id}/approve`, { method: "PATCH" });
//   return res.json();
// };

// // 🔴 رد درخواست
// export const rejectRequest = async (id) => {
//   const res = await fetch(`${API_URL}/${id}/reject`, { method: "PATCH" });
//   return res.json();
// };




// import api from "./api.js"; // 📁 فایل axios که interceptor JWT دارد

// const RequestAPI = {
//   // 🧩 دریافت همه درخواست‌ها (برای admin یا officer)
//   getAll: async () => {
//     try {
//       const res = await api.get("/admin/requests");
//       return res.data;
//     } catch (err) {
//       console.error("Error fetching requests:", err);
//       throw err;
//     }
//   },

//   // 🧩 دریافت یک درخواست خاص
//   getById: async (id) => {
//     try {
//       const res = await api.get(`/requests/${id}`);
//       return res.data;
//     } catch (err) {
//       console.error(`Error fetching request ${id}:`, err);
//       throw err;
//     }
//   },

//   // 🧩 ایجاد درخواست جدید (citizen)
//   create: async ({ serviceId, userId, status }) => {
//     try {
//       const res = await api.post("/requests", { service_id: serviceId, user_id: userId, status });
//       return res.data;
//     } catch (err) {
//       console.error("Error creating request:", err);
//       throw err;
//     }
//   },

//   // 🧩 حذف یک درخواست (admin یا officer)
//   delete: async (id) => {
//     try {
//       const res = await api.delete(`/requests/${id}`);
//       return res.data;
//     } catch (err) {
//       console.error(`Error deleting request ${id}:`, err);
//       throw err;
//     }
//   },

//   // 🧩 آپدیت وضعیت درخواست (approve/reject)
//   updateStatus: async (id, status) => {
//     try {
//       const res = await api.put(`/requests/${id}/status`, { status });
//       return res.data;
//     } catch (err) {
//       console.error(`Error updating status for request ${id}:`, err);
//       throw err;
//     }
//   },
// };

// export default RequestAPI;





import api from "./api.js";

const RequestAPI = {

  // 🟢 دریافت همه درخواست‌ها (Admin)
  getAll: async () => {
    const res = await api.get("/requests");   // ❗ این درست است
    return res.data;
  },

  // 🟡 دریافت درخواست‌های خود کاربر (Citizen)
  getMyRequests: async () => {
    const res = await api.get("/requests/my-requests");  // ✔ مسیر درست
    return res.data;
  },

  // 🟢 ایجاد درخواست
  create: async ({ serviceId, description }) => {
    const res = await api.post("/requests", {
      service_id: serviceId,
      description: description,
    });
    return res.data;
  },

  // 🔴 حذف درخواست
  delete: async (id) => {
    const res = await api.delete(`/requests/${id}`);
    return res.data;
  },

  // 🟣 آپدیت وضعیت
  updateStatus: async (id, status) => {
    const res = await api.put(`/requests/${id}/status`, { status });
    return res.data;
  },
};

export default RequestAPI;
