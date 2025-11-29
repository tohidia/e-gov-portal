// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function LoginForm({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:3000/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
        
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");
//       localStorage.setItem("token", data.token);
      
//       localStorage.setItem("user", JSON.stringify(data.user));
//       toast.success(`Welcome back, ${data.user.name}!`);
//       onLogin(data.user);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-4">
//       <h2 className="text-2xl font-semibold text-center text-indigo-600">Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
//         required
//       />
//       <button
//         type="submit"
//         className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//       >
//         Login
//       </button>
//     </form>
//   );
// }



// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function LoginForm({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.message || "Login failed");
//         return;
//       }

//       // ✅ Save token in localStorage
//       localStorage.setItem("token", data.token);

//       toast.success("Login successful!");
//       if (onLogin) onLogin();

//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }


// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function LoginForm({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("Login response:", data); // 👀 Debug line

//       if (!res.ok) {
//         toast.error(data.message || "Login failed");
//         return;
//       }

//       // ✅ Save token to localStorage
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         toast.success("Login successful!");
//         if (onLogin) onLogin();
//       } else {
//         toast.error("No token received from server!");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error("Something went wrong!");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full p-2 mb-3 border rounded"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-2 mb-3 border rounded"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
//         Login
//       </button>
//     </form>
//   );
// }


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




// import { useState } from "react";
// import { toast } from "react-toastify";
// import api from "../api/api";

// export default function LoginForm({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // 🔹 ارسال درخواست لاگین
//       const res = await api.post("/users/login", { email, password });
//       const data = res.data;
//       console.log("Login response:", data);

//       if (data.token) {
//         // 🔹 ذخیره اطلاعات در localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.user?.role || "citizen");
//         localStorage.setItem("name", data.user?.name || "");

//         toast.success("✅ Login successful!");
//         if (onLogin) onLogin();

//         // 🔹 هدایت یا رفرش صفحه
//         setTimeout(() => window.location.href = "/", 500);
//       } else {
//         toast.error("❌ No token received from server!");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error(err.response?.data?.message || "❌ Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
//         Login
//       </h2>

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-400"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         autoComplete="username"
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-2 mb-3 border rounded-md focus:ring-2 focus:ring-indigo-400"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         autoComplete="current-password"
//         required
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full bg-indigo-600 text-white py-2 rounded-md transition ${
//           loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
//         }`}
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// }

