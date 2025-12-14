// src/components/Loader.jsx
import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <div className="h-5 w-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <span className="text-sm text-gray-400">{text}</span>
    </div>
  );
};

export default Loader;
