import React from "react";
import { Briefcase, Users, Target, Search } from "lucide-react";

const Sidebar = ({ currentPage, setCurrentPage, navItems }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-white to-gray-50 shadow-2xl border-r border-gray-200/50 backdrop-blur-sm">
      {/* Logo Header */}
      <div className="p-6 lg:p-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-br-3xl shadow-2xl border-b border-indigo-200/50 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2 animate-fade-in">
          <div className="relative p-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
            <img
              src="/src/assets/logo2.png" // ✅ Fixed path for src/assets/
              alt="SkillMatch Logo"
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer hover:shadow-emerald-500/25"
            />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
              <span className="text-[10px] font-bold text-white">AI</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 bg-clip-text text-transparent tracking-tight leading-tight">
              Skill
              <span className="text-transparent bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text">
                Match
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xs lg:text-sm font-semibold text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-1.5 lg:px-5 lg:py-2 rounded-xl shadow-md border border-gray-200/50">
                Resource Management System
              </p>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4 space-y-1 pb-8 overflow-y-auto h-[calc(100vh-200px)]">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`group w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-x-1 hover:z-10 relative overflow-hidden ${
              currentPage === id
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/25 scale-[1.02] border-2 border-blue-200/50"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:border hover:border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-sm"
            }`}
          >
            {/* Active indicator */}
            {currentPage === id && (
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-emerald-400 to-green-500 shadow-lg"></div>
            )}

            {/* Icon */}
            <div
              className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0 ${
                currentPage === id
                  ? "bg-white/20 backdrop-blur-sm shadow-lg shadow-white/25"
                  : "group-hover:bg-white/30 group-hover:shadow-md"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  currentPage === id
                    ? "text-white drop-shadow-lg"
                    : "text-gray-500 group-hover:text-blue-600"
                }`}
              />
            </div>

            {/* Label */}
            <span className="font-semibold text-base tracking-wide flex-1 truncate">
              {label}
            </span>

            {/* Active badge */}
            {currentPage === id && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg shadow-white/25">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                Active
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-gradient-to-r from-gray-100 to-gray-200/50 rounded-2xl shadow-lg border border-gray-300/50 backdrop-blur-sm">
        <p className="text-xs text-gray-600 text-center font-medium tracking-wide">
          Powered by AI Matching Engine ✨
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
