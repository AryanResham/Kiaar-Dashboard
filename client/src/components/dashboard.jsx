"use client";

import { useState } from "react";
import ChartBox from "./ChartBox";
import vegetationHealthData from "./vegetationHealthData.json";
import waterStressData from "./waterStressData.json";
import landClassificationData from "./landClassificationData.json";

export default function Dashboard({ darkMode }) {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 Days");
  const [activeTab, setActiveTab] = useState("Vegetation Health");

  const metrics = [
    {
      title: "Average NDVI",
      value: "0.72",
      change: "+0.05 from last period",
      changeType: "positive",
    },
    {
      title: "Water Stress Index",
      value: "-0.15",
      change: "Moderate Stress",
      changeType: "warning",
    },
    {
      title: "Sugarcane Coverage",
      value: "68%",
      change: "+2% from last period",
      changeType: "positive",
    },
    {
      title: "Last Updated",
      value: "Today",
      change: "March 26, 2025 at 14:30",
      changeType: "neutral",
    },
  ];

  const tabs = [
    "Vegetation Health",
    "Water Stress",
    "Land Classification",
  ];

  // Map tab to data and chart info
  const tabDataMap = {
    "Vegetation Health": {
      data: vegetationHealthData,
      title: "Vegetation Health Indices",
      desc: "Track NDVI, EVI, and SAVI indices over time"
    },
    "Water Stress": {
      data: waterStressData,
      title: "Water Stress Indices",
      desc: "Monitor water stress levels and trends"
    },
    "Land Classification": {
      data: landClassificationData,
      title: "Land Classification",
      desc: "Analyze land cover and classification changes"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            GIS Analytics Dashboard
          </h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
            Monitor vegetation health, water stress, and land classification
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <option>All Regions</option>
            <option>North Region</option>
            <option>South Region</option>
            <option>East Region</option>
            <option>West Region</option>
          </select>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
          </select>

          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-sm border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h3
              className={`text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {metric.title}
            </h3>
            <div
              className={`text-2xl font-bold mb-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {metric.value}
            </div>
            <div
              className={`text-sm ${
                metric.changeType === "positive"
                  ? "text-green-600"
                  : metric.changeType === "warning"
                  ? "text-yellow-600"
                  : darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`rounded-lg shadow-sm border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? darkMode
                      ? "border-blue-500 text-blue-400"
                      : "border-blue-500 text-blue-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {tabDataMap[activeTab].title}
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {tabDataMap[activeTab].desc}
            </p>
          </div>

          <div
            className={`h-96 flex items-center justify-center rounded-lg border-2 border-dashed ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <ChartBox data={tabDataMap[activeTab].data} />
          </div>
        </div>
      </div>
    </div>
  );
}
