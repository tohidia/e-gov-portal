// // // src/api/requests.js
// import api from "./api.js";

// const RequestAPI = {

//   // 🟢 دریافت همه درخواست‌ها (Admin)
//   getAll: async () => {
//     const res = await api.get("/requests");   // ❗ این درست است
//     return res.data;
//   },

//   // 🟡 دریافت درخواست‌های خود کاربر (Citizen)
//   getMyRequests: async () => {
//     const res = await api.get("/requests/my-requests");  // ✔ مسیر درست
//     return res.data;
//   },

//   // 🟢 ایجاد درخواست
//   create: async ({ serviceId, description }) => {
//     const res = await api.post("/requests", {
//       service_id: serviceId,
//       description: description,
//     });
//     return res.data;
//   },

//   // 🔴 حذف درخواست
//   delete: async (id) => {
//     const res = await api.delete(`/requests/${id}`);
//     return res.data;
//   },

//   // 🟣 آپدیت وضعیت
//   updateStatus: async (id, status) => {
//     const res = await api.put(`/requests/${id}/status`, { status });
//     return res.data;
//   },
// };

// export default RequestAPI;



import api from "./api.js";

const RequestAPI = {
  // 🟢 دریافت همه درخواست‌ها (Admin → Backend 3000)
  // getAll: async () => {
  //   const res = await api.get("/requests");
  //   return res.data;
  // },

  getAll: async () => {
  const res = await api.get("/admin/requests");
  return res.data;
},


  // 🟡 دریافت درخواست‌های کاربر عادی
  getMyRequests: async () => {
    const res = await api.get("/requests/my-requests");
    return res.data;
  },

  // 🟢 ایجاد درخواست
  create: async ({ serviceId, description }) => {
    const res = await api.post("/requests", {
      service_id: serviceId,
      description,
    });
    return res.data;
  },

  // 🔴 حذف درخواست
  delete: async (id) => {
    const res = await api.delete(`/requests/${id}`);
    return res.data;
  },

  // 🟣 آپدیت وضعیت درخواست
  updateStatus: async (id, status) => {
    const res = await api.put(`/requests/${id}/status`, { status });
    return res.data;
  },
};

export default RequestAPI;
