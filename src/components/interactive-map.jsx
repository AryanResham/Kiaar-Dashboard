"use client"

import { useState } from "react"

export default function InteractiveMap() {
  const [selectedView, setSelectedView] = useState("Satellite")
  const [activeControl, setActiveControl] = useState("layers")
  const [zoomLevel, setZoomLevel] = useState(10)
  const [coordinates] = useState("34.0522° N, 118.2437° W")

  const mapControls = [
    { id: "layers", label: "Layers", icon: "📋" },
    { id: "markers", label: "Markers", icon: "📍" },
    { id: "measure", label: "Measure", icon: "📏" },
  ]

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 1, 20))
  }

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 1, 1))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Map</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Explore and analyze geospatial data</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option>All Regions</option>
            <option>North Region</option>
            <option>South Region</option>
            <option>East Region</option>
            <option>West Region</option>
          </select>

          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option>Satellite</option>
            <option>Street</option>
            <option>Terrain</option>
            <option>Hybrid</option>
          </select>

          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Export Map
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          {mapControls.map((control) => (
            <button
              key={control.id}
              onClick={() => setActiveControl(control.id)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeControl === control.id
                  ? "bg-black text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              <span className="mr-2">{control.icon}</span>
              {control.label}
            </button>
          ))}
        </div>

        {/* Coordinates Display */}
        <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300">
          Coordinates: {coordinates}
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-20 right-4 z-10 flex flex-col space-y-1">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            −
          </button>
          <button className="w-10 h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            🎯
          </button>
        </div>

        {/* Map Area */}
        <div className="h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <div className="text-gray-500 dark:text-gray-400 text-lg">[Map View]</div>
            <div className="text-gray-400 dark:text-gray-500 text-sm mt-2">Zoom Level: {zoomLevel}</div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div>Scale: 1:10,000</div>
          <div>Last updated: March 26, 2025</div>
        </div>
      </div>
    </div>
  )
}
