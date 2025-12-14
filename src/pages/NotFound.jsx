// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-lg text-gray-500">
        Page not found
      </p>

      <Link
        to="/"
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
