"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import DataManagement from "./components/DataManagement";
import DataVisualization from "./components/DataVisualization";
import Users from "./components/Users";

import Tools from "./components/Tools";
import "leaflet/dist/leaflet.css";
import MapView from "./components/MapView";
import AuthForm from "./components/AuthForm";
export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard darkMode={darkMode} />;
      case "data-management":
        return <DataManagement darkMode={darkMode} />;
      case "map":
        return <MapView darkMode={darkMode} />;
      case "data-visualization":
        return <DataVisualization darkMode={darkMode} />;
      case "users":
        return <Users darkMode={darkMode} />;
      case "tools":
        return <Tools darkMode={darkMode} />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  const handleUserClick = () => setActiveTab("users");
  const handleLogout = () => setUser(null);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div>
          <AuthForm
            onAuth={(data) => setUser(data.user || data)}
            isSignup={showSignup}
          />
          <div className="text-center mt-4">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setShowSignup((v) => !v)}
            >
              {showSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          user={user}
          onUserClick={handleUserClick}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <Header darkMode={darkMode} user={user} onUserClick={handleUserClick} />
          <main className="p-6">
            {activeTab === "users" ? (
              <Users darkMode={darkMode} user={user} onLogout={handleLogout} />
            ) : (
              renderContent()
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
