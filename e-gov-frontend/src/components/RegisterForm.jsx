// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function RegisterForm() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "citizen" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:3000/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Registration failed");
//       toast.success("User registered successfully!");
//       setForm({ name: "", email: "", password: "", role: "citizen" });
//     } catch (err) {
//       toast.error(err.message);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-4">
//       <h2 className="text-2xl font-semibold text-center text-indigo-600">Register</h2>
//       <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400" />
//       <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400" />
//       <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400" />
//       <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded-md">
//         <option value="citizen">Citizen</option>
//         <option value="admin">Admin</option>
//       </select>
//       <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
//         Register
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Register response:", data); // 🔍 بررسی در Console

      if (!res.ok) throw new Error(data.message || "Registration failed");
      if (!data.user || !data.user.id)
        throw new Error("User not saved in database!");

      toast.success("✅ User registered successfully!");
      setForm({ name: "", email: "", password: "", role: "citizen" });
    } catch (err) {
      console.error("Register error:", err);
      toast.error("❌ " + err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-indigo-600">
        Register
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
        autoComplete="name"
        required
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
        autoComplete="username"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
        autoComplete="new-password"
        required
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
      >
        <option value="citizen">Citizen</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Register
      </button>
    </form>
  );
}
