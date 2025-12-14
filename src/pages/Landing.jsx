// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          🚀 AUTOMEND AI
        </h1>
        <p className="text-lg text-gray-400">
          Autonomous AI system for running, debugging, explaining, and testing real projects
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Feature
          title="🤖 AI Chatbot"
          desc="Ask coding questions like ChatGPT, but developer-focused."
          onClick={() => navigate("/chatbot")}
        />
        <Feature
          title="⚙️ AI Runner"
          desc="Upload a project, run it, auto-debug errors, and download fixed code."
          onClick={() => navigate("/runner")}
        />
        <Feature
          title="📘 Project Explainer"
          desc="Understand any GitHub project instantly."
          onClick={() => navigate("/explainer")}
        />
        <Feature
          title="🧪 Test Generator"
          desc="Auto-generate and run tests using AI."
          onClick={() => navigate("/testgen")}
        />
      </div>
    </div>
  );
};

const Feature = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-6 rounded-xl bg-slate-900 hover:bg-slate-800 transition space-y-3"
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

export default Landing;
