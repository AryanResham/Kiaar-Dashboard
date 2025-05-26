"use client"

export default function Tools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Access various GIS analysis tools</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">GIS Tools</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This section will contain various GIS analysis and processing tools.
          </p>
        </div>
      </div>
    </div>
  )
}
