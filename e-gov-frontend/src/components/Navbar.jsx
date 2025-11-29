// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-indigo-600 text-white shadow-lg py-4 px-8 flex justify-between items-center rounded-b-2xl">
//       <h1 className="text-2xl font-bold tracking-wide">E-Gov Portal</h1>
//       <div className="space-x-6">
//         <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
//         <Link to="/requests" className="hover:text-yellow-300 transition">My Requests</Link>
//         <Link to="/manage" className="hover:text-yellow-300 transition">Manage Requests</Link>
//         <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
//       </div>
//     </nav>
//   );
// }





import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
      >
        E-Gov Portal
      </Link>

      <div className="flex gap-6 text-lg items-center">
        {!user && (
          <>
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-300 transition">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="font-semibold">{user.name}</span>

            {user.role === "admin" && (
              <Link to="/" className="hover:text-yellow-300 transition">
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
