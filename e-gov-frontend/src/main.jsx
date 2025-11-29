// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React from "react";
// import ReactDOM from "react-dom/client";

// import CreateRequest from "./components/CreateRequest";
// import RequestList from "./components/RequestList";
// import ManageRequests from "./components/ManageRequests"; // ← اینجا اضافه کنید

// function App() {
//   return (
//     <div>
//       <h1>E-Gov Portal</h1>
//       <CreateRequest />
//       <RequestList />
//       <ManageRequests /> {/* نمایش جدول ManageRequests */}
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);



// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css"; // برای Tailwind CSS

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css"; // important!

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
//   <ToastContainer position="top-right" autoClose={3000} />

// );


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // important!

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  </React.StrictMode>
);
