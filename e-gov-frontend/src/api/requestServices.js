// // src/api/requestServices.js
// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// const getToken = () => localStorage.getItem("token");

// export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

// export const getAllRequests = () => {
//   const token = getToken();
//   return axios.get(`${API_URL}/requests`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };


import axios from "axios";

const API_5000 = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

// 🔵 Login → eGov 5000
export const loginUser = (data) =>
  axios.post(`${API_5000}/auth/login`, data, {
    withCredentials: true
  });

// 🟣 دریافت همه درخواست‌ها از پورت 5000
export const getAllRequests = () => {
  const token = getToken();
  return axios.get(`${API_5000}/requests`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
};

