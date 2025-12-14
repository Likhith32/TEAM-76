// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// Pages
import Landing from "./pages/Landing";
import Chatbot from "./pages/Chatbot";
import Runner from "./pages/Runner";
import ProjectExplainer from "./pages/ProjectExplainer";
import TestGenerator from "./pages/TestGenerator";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "chatbot",
        element: <Chatbot />,
      },
      {
        path: "runner",
        element: <Runner />,
      },
      {
        path: "explainer",
        element: <ProjectExplainer />,
      },
      {
        path: "testgen",
        element: <TestGenerator />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
