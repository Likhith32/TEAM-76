// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-4 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} AUTOMEND AI · Autonomous Code Debugging Platform
    </footer>
  );
};

export default Footer;
