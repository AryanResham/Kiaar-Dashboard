"use client";

export default function Tools({ darkMode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Tools
        </h1>
        <p className={`${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          Access various GIS analysis tools
        </p>
      </div>

      <div
        className={`rounded-lg shadow-sm border p-8 ${
          darkMode ? "bg-gray-800 border-gray-700 " : "bg-white border-gray-200"
        }`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h3
            className={`text-lg font-semibold mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            GIS Tools
          </h3>
          <p className={`${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            This section will contain various GIS analysis and processing tools.
          </p>
        </div>
      </div>
    </div>
  );
}
