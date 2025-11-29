import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && role !== "Admin") return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
