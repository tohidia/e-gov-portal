import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return <Navigate to="/login" />;

  const user = JSON.parse(storedUser);

  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirect if role does not match
  }

  return children;
}
