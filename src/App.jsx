"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import DataManagement from "./components/data-management";
import InteractiveMap from "./components/interactive-map";
import DataVisualization from "./components/data-visualization";
import Users from "./components/users";
import Settings from "./components/settings";
import Tools from "./components/tools";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "data-management":
        return <DataManagement />;
      case "map":
        return <InteractiveMap />;
      case "data-visualization":
        return <DataVisualization />;
      case "users":
        return <Users />;
      case "settings":
        return <Settings />;
      case "tools":
        return <Tools />;
      default:
        return <Dashboard />;
    }
  };

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
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <Header darkMode={darkMode} />
          <main className="p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
