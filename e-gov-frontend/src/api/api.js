// // src/api/api.js
// const BASE_URL = 'http://localhost:3000/api';

// // Users
// export const fetchUsers = async () => {
//   const res = await fetch(`${BASE_URL}/users`);
//   return res.json();
// };

// // Departments
// export const fetchDepartments = async () => {
//   const res = await fetch(`${BASE_URL}/departments`);
//   return res.json();
// };

// // Services
// export const fetchServices = async () => {
//   const res = await fetch(`${BASE_URL}/services`);
//   return res.json();
// };

// // Requests
// export const fetchRequests = async () => {
//   const res = await fetch(`${BASE_URL}/requests`);
//   return res.json();
// };

// // Create a request (with JSON)
// export const createRequest = async (data) => {
//   const res = await fetch(`${BASE_URL}/requests`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// // Update request status
// export const updateRequestStatus = async (id, status) => {
//   const res = await fetch(`${BASE_URL}/requests/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ status }),
//   });
//   return res.json();
// };

// // Delete a request
// export const deleteRequest = async (id) => {
//   const res = await fetch(`${BASE_URL}/requests/${id}`, { method: 'DELETE' });
//   return res.json();
// };

// // Create request with FormData (for file upload)
// export const createRequestWithFiles = async (formData) => {
//   const res = await fetch(`${BASE_URL}/requests`, {
//     method: "POST",
//     body: formData,
//   });
//   return res.json();
// };



// // src/api/api.js
// const BASE_URL = 'http://localhost:3000/api';

// // 📦 Helper function to get token
// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // =============================
// // USERS
// // =============================
// export const fetchUsers = async () => {
//   const res = await fetch(`${BASE_URL}/users`, {
//     headers: getAuthHeader(),
//   });
//   return res.json();
// };

// // =============================
// // DEPARTMENTS
// // =============================
// export const fetchDepartments = async () => {
//   const res = await fetch(`${BASE_URL}/departments`, {
//     headers: getAuthHeader(),
//   });
//   return res.json();
// };

// // =============================
// // REQUESTS
// // =============================
// export const fetchRequests = async () => {
//   const res = await fetch(`${BASE_URL}/requests`, {
//     headers: getAuthHeader(),
//   });
//   return res.json();
// };

// // ایجاد درخواست
// export const createRequest = async (data) => {
//   const res = await fetch(`${BASE_URL}/requests`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       ...getAuthHeader(),
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// // تغییر وضعیت درخواست
// export const updateRequestStatus = async (id, status) => {
//   const res = await fetch(`${BASE_URL}/requests/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       ...getAuthHeader(),
//     },
//     body: JSON.stringify({ status }),
//   });
//   return res.json();
// };

// // حذف درخواست
// export const deleteRequest = async (id) => {
//   const res = await fetch(`${BASE_URL}/requests/${id}`, {
//     method: 'DELETE',
//     headers: getAuthHeader(),
//   });
//   return res.json();
// };

// // ارسال درخواست با فایل
// export const createRequestWithFiles = async (formData) => {
//   const res = await fetch(`${BASE_URL}/requests`, {
//     method: 'POST',
//     headers: getAuthHeader(), // اضافه شد
//     body: formData,
//   });
//   return res.json();
// };



// // src/api/api.js
// const API_URL = "http://localhost:3000/api";

// // 🧠 تابع گرفتن تمام درخواست‌ها
// export async function fetchRequests() {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API_URL}/requests`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) {
//     const msg = await res.text();
//     throw new Error(msg || "Failed to fetch requests");
//   }

//   return await res.json();
// }


// // src/api/api.js
// import axios from "axios";

// // ✅ ساخت instance از axios
// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
// });

// // ✅ قبل از هر درخواست: اگر توکن وجود دارد، بفرست
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // ✅ بعد از هر پاسخ: اگر JWT منقضی شده، کاربر را logout کن
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("🔐 Token expired — redirecting to login...");
//       localStorage.removeItem("token");
//       window.location.href = "/login"; // مسیر صفحه لاگین
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;




// // src/api/api.js
// import axios from "axios";

// // ✅ ساخت instance از axios
// const api = axios.create({
//   baseURL: "http://localhost:3000/api", // آدرس سرور بک‌اند
// });

// // ✅ قبل از هر درخواست: اگر توکن وجود دارد، آن را بفرست
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log("🔑 Sending token:", token); // برای Debug

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     console.warn("⚠️ No token found in localStorage!");
//   }

//   return config;
// });

// // ✅ بعد از هر پاسخ: اگر JWT منقضی شده، کاربر را logout کن
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("🔐 Token expired — redirecting to login...");
//       localStorage.removeItem("token");
//       window.location.href = "/login"; // مسیر صفحه لاگین
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


// // src/api/api.js
// import axios from "axios";

// // ✅ ساخت یک instance از axios
// const api = axios.create({
//   baseURL: "http://localhost:3000/api", // آدرس سرور بک‌اند (در صورت نیاز تغییر بده)
// });

// // ✅ قبل از هر درخواست: اگر توکن وجود دارد، آن را در هدر قرار بده
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log("🔑 Sending token:", token); // برای بررسی در Console

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("⚠️ No token found in localStorage!");
//     }

//     return config;
//   },
//   (error) => {
//     console.error("🚫 Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // ✅ بعد از هر پاسخ: بررسی منقضی شدن JWT یا خطای 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         console.warn("🔐 Token expired — redirecting to login...");
//         localStorage.removeItem("token");
//         window.location.href = "/login"; // هدایت کاربر به صفحه لاگین
//       } else {
//         console.error("❌ API Error:", error.response);
//       }
//     } else {
//       console.error("🚨 Network Error:", error);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




// // src/api/api.js
// import axios from "axios";

// // 🔹 ساخت instance
// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
// });

// // 🔹 قبل از هر درخواست، JWT را به Header اضافه کن
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log("🔑 Sending token:", token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("⚠️ No token found in localStorage!");
//     }

//     return config;
//   },
//   (error) => {
//     console.error("🚫 Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // 🔹 بعد از هر پاسخ: مدیریت منقضی شدن توکن و خطاهای 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         console.warn("🔐 Token expired — redirecting to login...");
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       } else {
//         console.error("❌ API Error:", error.response);
//       }
//     } else {
//       console.error("🚨 Network Error:", error);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




// // ✅ src/api/api.js
// import axios from "axios";

// // ساخت یک instance از axios با تنظیمات ثابت
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;




// // ✅ src/api/api.js
// import axios from "axios";

// // ساخت instance از axios
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ قبل از هر درخواست، اگر توکن وجود دارد، آن را در هدر بفرست
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
