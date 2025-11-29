// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-indigo-600">
        Welcome to E-Gov Portal
      </h1>
      <a
        href="/passport"
        className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        Go to Passport Form
      </a>
    </div>
  );
};

export default Home;
