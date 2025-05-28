"use client";

import { useState } from "react";

export default function DataManagement({ darkMode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Datasets");
  const [showFilter, setShowFilter] = useState(false);

  const [datasets, setDatasets] = useState([
    {
      id: 1,
      name: "Vegetation Index 2025",
      type: "xyz",
      size: "1.2 GB",
      lastUpdated: "2025-03-24",
      status: "Active",
    },
    {
      id: 2,
      name: "Land Classification",
      type: "abc",
      size: "450 MB",
      lastUpdated: "2025-03-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Water Bodies",
      type: "xyz",
      size: "320 MB",
      lastUpdated: "2025-03-15",
      status: "Active",
    },
    {
      id: 4,
      name: "Soil Moisture",
      type: "abc",
      size: "2.1 GB",
      lastUpdated: "2025-03-10",
      status: "Processing",
    },
    {
      id: 5,
      name: "Agricultural Parcels",
      type: "xyz",
      size: "180 MB",
      lastUpdated: "2025-03-05",
      status: "Active",
    },
  ]);

  const tabs = ["Datasets", "Imports", "Exports", "Archives"];

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setDatasets(datasets.filter((dataset) => dataset.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between ${
          darkMode
            ? " border-gray-700 text-white"
            : "border-gray-200 text-gray-900"
        }`}
      >
        <div>
          <h1 className="text-2xl font-bold">Data Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage, import, and export GIS datasets
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <span className="mr-2">📥</span>
            Import
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <span className="mr-2">📤</span>
            Export
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            + New Dataset
          </button>
        </div>
      </div>

      <div
        className={`rounded-lg shadow-sm border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } transition-colors`}
      >
        <div
          className={`border-b rounded-t-lg ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } transition-colors`}
        >
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab
                    ? `border-blue-500 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`
                    : `border-transparent text-gray-700 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300`
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div
          className={`px-4 py-2 rounded-lg ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } transition-colors`}
        >
          <div className="pt-3 flex flex-col sm:flex-row gap-4 mb-6">
            <div className={`relative flex-1 `}>
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                  darkMode
                    ? "bg-gray-700 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } transition-colors`}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">🔽</span>
              Filter
            </button>

            <button
              className={`p-2 border rounded-lg transition-colors ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              🔄
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${
                    darkMode
                      ? "text-white border-gray-700"
                      : "text-gray-900 border-gray-200"
                  }`}
                >
                  <th className="text-left py-3 px-4 ">Name</th>
                  <th className="text-left py-3 px-4 ">Type</th>
                  <th className="text-left py-3 px-4 ">Size</th>
                  <th className="text-left py-3 px-4 ">Last Updated</th>
                  <th className="text-left py-3 px-4 ">Status</th>
                  <th className="text-left py-3 px-4 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDatasets.map((dataset) => (
                  <tr
                    key={dataset.id}
                    className={`border-b ${
                      darkMode
                        ? "text-gray-600 border-gray-700"
                        : "text-gray-400 border-gray-200"
                    }`}
                  >
                    <td
                      className={`py-3 px-4 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {dataset.name}
                    </td>
                    <td className="py-3 px-4">{dataset.type}</td>
                    <td className="py-3 px-4">{dataset.size}</td>
                    <td className="py-3 px-4">{dataset.lastUpdated}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          dataset.status
                        )}`}
                      >
                        {dataset.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dataset.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
