// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ authToken, children }) {
//   if (!authToken) return <Navigate to="/login" />;
//   return children;
// }


// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const storedUser = localStorage.getItem("user");
//   if (!storedUser) return <Navigate to="/login" />;

//   const user = JSON.parse(storedUser);

//   if (role && user.role !== role) {
//     return <Navigate to="/" />; // دسترسی فقط برای نقش مشخص
//   }

//   return children;
// }



// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const storedUser = localStorage.getItem("user");
//   if (!storedUser) return <Navigate to="/login" />; // If not logged in, redirect to login

//   const user = JSON.parse(storedUser);

//   // If role is defined and the user's role doesn't match, redirect to home
//   if (role && user.role !== role) {
//     return <Navigate to="/" />;
//   }

//   // Otherwise, render the protected content
//   return children;
// }


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
