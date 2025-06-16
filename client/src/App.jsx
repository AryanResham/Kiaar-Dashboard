"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import DataManagement from "./components/DataManagement";
import DataVisualization from "./components/DataVisualization";
import Users from "./components/Users";
import Settings from "./components/Settings";
import Tools from "./components/Tools";
import "leaflet/dist/leaflet.css";
import MapView from "./components/MapView";
export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      case "settings":
        return <Settings darkMode={darkMode} />;
      case "tools":
        return <Tools darkMode={darkMode} />;
      default:
        return <Dashboard darkMode={darkMode} />;
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
