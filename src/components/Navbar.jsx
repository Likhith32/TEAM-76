// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:bg-slate-800"
    }`;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="font-bold text-lg text-indigo-400 cursor-pointer">
        AUTOMEND AI
      </div>

      {/* Links */}
      <div className="flex items-center gap-2">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/chatbot" className={linkClass}>
          Chatbot
        </NavLink>
        <NavLink to="/runner" className={linkClass}>
          Runner
        </NavLink>
        <NavLink to="/explainer" className={linkClass}>
          Explainer
        </NavLink>
        <NavLink to="/testgen" className={linkClass}>
          TestGen
        </NavLink>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700"
        title="Toggle theme"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
};

export default Navbar;
