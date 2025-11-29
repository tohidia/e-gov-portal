// src/api/requestService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/requests';

// گرفتن همه درخواست‌ها
export const getRequests = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// گرفتن درخواست خاص
export const getRequestById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// ایجاد درخواست جدید
export const createRequest = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// تغییر وضعیت درخواست
export const updateRequestStatus = async (id, status) => {
  const res = await axios.put(`${API_URL}/${id}/status`, { status });
  return res.data;
};

// حذف درخواست
export const deleteRequest = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
