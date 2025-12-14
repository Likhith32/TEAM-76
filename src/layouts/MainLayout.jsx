// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

/**
 * Main layout wrapper for all pages
 */
const MainLayout = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const shellStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    color: isDark ? "#e5e7eb" : "#020617",
    backgroundColor: isDark ? "#020617" : "#f9fafb",
    position: "relative",
    overflowX: "hidden",
  };

  const bgLayerStyle = isDark
    ? {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.18), transparent 55%)," +
          "radial-gradient(circle at 100% 0%, rgba(129,140,248,0.16), transparent 55%)," +
          "radial-gradient(circle at 0% 100%, rgba(52,211,153,0.16), transparent 55%)",
        backgroundSize: "180% 180%",
        animation: "ml-bg-move 26s ease-in-out infinite",
        opacity: 0.7,
        zIndex: -1,
      }
    : {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(129,140,248,0.12), transparent 55%)," +
          "radial-gradient(circle at 100% 100%, rgba(56,189,248,0.12), transparent 55%)",
        backgroundSize: "180% 180%",
        animation: "ml-bg-move 26s ease-in-out infinite",
        opacity: 0.7,
        zIndex: -1,
      };

  const mainStyle = {
    flex: 1,
    width: "100%",
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "18px 16px 24px 16px",
    boxSizing: "border-box",
  };

  return (
    <>
      <style>
        {`
          @keyframes ml-bg-move {
            0%,100% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
          }
        `}
      </style>

      <div style={shellStyle}>
        <div style={bgLayerStyle} />

        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main style={mainStyle}>
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
