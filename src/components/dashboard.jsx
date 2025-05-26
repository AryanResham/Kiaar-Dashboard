"use client"

import { useState } from "react"

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 Days")
  const [activeTab, setActiveTab] = useState("Vegetation Health")

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
  ]

  const tabs = ["Vegetation Health", "Water Stress", "Land Classification", "Interactive Map"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GIS Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor vegetation health, water stress, and land classification
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{metric.title}</h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</div>
            <div
              className={`text-sm ${
                metric.changeType === "positive"
                  ? "text-green-600"
                  : metric.changeType === "warning"
                    ? "text-yellow-600"
                    : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vegetation Health Indices</h3>
            <p className="text-gray-600 dark:text-gray-400">Track NDVI, EVI, and SAVI indices over time</p>
          </div>

          <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-gray-500 dark:text-gray-400">[Chart Here]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
