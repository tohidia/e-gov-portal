// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PassportForm from "./pages/PassportForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/passport" element={<PassportForm />} />
      </Routes>
    </Router>
  );
}

export default App;

