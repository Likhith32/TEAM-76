// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { ExecutionProvider } from "./context/ExecutionContext";

import "./styles/global.css"; // optional, if you have global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ExecutionProvider>
        <RouterProvider router={router} />
      </ExecutionProvider>
    </ThemeProvider>
  </React.StrictMode>
);
