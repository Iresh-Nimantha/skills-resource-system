// ==========================================
// FILE: src/App.jsx
// ==========================================
import React, { useState } from "react";
import {
  Users,
  Target,
  Briefcase,
  Search,
  LayoutDashboard,
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import PersonnelManagement from "./components/PersonnelManagement";
import SkillsManagement from "./components/SkillsManagement";
import ProjectsManagement from "./components/ProjectsManagement";
import FindMatches from "./components/FindMatches";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "personnel":
        return <PersonnelManagement />;
      case "skills":
        return <SkillsManagement />;
      case "projects":
        return <ProjectsManagement />;
      case "matches":
        return <FindMatches />;
      default:
        return <Dashboard />;
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "personnel", label: "Personnel", icon: Users },
    { id: "skills", label: "Skills", icon: Target },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "matches", label: "Find Matches", icon: Search },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-sm shadow-lg border-r border-gray-200 flex flex-col">
        {/* Logo Header */}
        <div className="p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-br-lg shadow-lg border-b border-indigo-200/50">
          <div className="flex justify-center mb-4">
            <div className="relative p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50">
              <img
                src="/src/assets/logo2.png"
                alt="SkillMatch Logo"
                className="w-full h-16 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
                <span className="text-xs font-bold text-white">AI</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm font-semibold text-gray-700 bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full shadow-md border border-gray-200/50 mx-auto inline-block">
            Resource Management
          </p>
        </div>

        {/* Navigation - NORMAL BUTTONS */}
        <nav className="flex-1 mt-6 px-4 space-y-1 pb-8 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left rounded-lg transition-all duration-200 border-l-4 ${
                  isActive
                    ? "bg-blue-50 text-blue-800 border-blue-500 shadow-md font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:border-gray-200 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              4BEX
            </p>
            <p className="text-xs text-gray-600 font-medium">
              Internship Project
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-white/80 backdrop-blur-sm">
        <div className="p-8 h-full overflow-y-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default App;
