import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRequest from "./components/CreateRequest";
import RequestList from "./components/RequestList";
import ManageRequests from "./components/ManageRequests";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="p-10">
          <Routes>
            {/* 🏠 Home Page */}
            <Route
              path="/"
              element={
                <div>
                  {/* Citizen Section: Create Request */}
                  <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
                    <h2 className="text-2xl mb-4 border-b pb-2 text-indigo-600">
                      Create New Request
                    </h2>
                    <CreateRequest />
                  </div>

                  {/* Citizen Section: My Requests */}
                  <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
                    <h2 className="text-2xl mb-4 border-b pb-2 text-indigo-600">
                      My Requests
                    </h2>
                    <RequestList />
                  </div>

                  {/* Admin Section: Manage Requests */}
                  <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
                    <h2 className="text-2xl mb-4 border-b pb-2 text-indigo-600">
                      Manage Requests
                    </h2>
                    <ManageRequests />
                  </div>

                  {/* Admin Dashboard */}
                  <div className="max-w-6xl mx-auto">
                    <AdminDashboard />
                  </div>
                </div>
              }
            />

            {/* 🔐 Login / Register Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;




