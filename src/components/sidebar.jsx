"use client";

export default function Sidebar({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  collapsed,
  setCollapsed,
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "data-management", label: "Data Management", icon: "📁" },
    { id: "map", label: "Map", icon: "🗺️" },
    { id: "data-visualization", label: "Data Visualization", icon: "📈" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "tools", label: "Tools", icon: "🔧" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full ${collapsed ? "w-16" : "w-64"} ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-r transition-all duration-300 z-10`}
    >
      <div className="p-4 py-6">
        <div className="flex items-center space-x-2 ">
          <div className="grid grid-cols-2 gap-1 w-8 h-8">
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
          </div>
          <span
            className={`text-xl font-bold px-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            KIAAR
          </span>
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
              activeTab === item.id
                ? darkMode
                  ? "bg-gray-700 text-white border-r-2 border-blue-500"
                  : "bg-gray-100 text-gray-900 border-r-2 border-blue-500"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              🌙 Dark Mode
            </span>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {!collapsed && (
          <div
            className={`flex items-center space-x-2 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <span>👤</span>
            <span>User details / admin</span>
          </div>
        )}
      </div>
    </div>
  );
}
