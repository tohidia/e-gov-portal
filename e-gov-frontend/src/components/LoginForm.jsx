
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api"; // 📁 فایل axios که interceptor دارد

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      const data = res.data;
      console.log("Login response:", data); // 🔍 بررسی در Console

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user?.role || "citizen");
        localStorage.setItem("name", data.user?.name || "");

        toast.success("✅ Login successful!");
        if (onLogin) onLogin();

        setTimeout(() => window.location.reload(), 800);
      } else {
        toast.error("No token received from server!");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "❌ Login failed!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Login
      </button>
    </form>
  );
}


