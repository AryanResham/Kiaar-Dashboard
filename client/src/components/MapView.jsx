import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Rectangle,
} from "react-leaflet";
import { useState, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "react-datepicker/dist/react-datepicker.css";

const MapView = ({ darkMode }) => {
  const [bounds, setBounds] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Hook for handling map click and drag events
  const BoundingBoxDrawer = () => {
    const map = useMapEvents({
      mousedown: (e) => {
        if (!bounds) {
          setIsDrawing(true);
          setStartPoint(e.latlng);
          const initialBounds = [
            [e.latlng.lat, e.latlng.lng],
            [e.latlng.lat, e.latlng.lng],
          ];
          setBounds(initialBounds);
        }
      },
      mousemove: (e) => {
        if (isDrawing && startPoint) {
          const newBounds = [
            [
              Math.min(startPoint.lat, e.latlng.lat),
              Math.min(startPoint.lng, e.latlng.lng),
            ],
            [
              Math.max(startPoint.lat, e.latlng.lat),
              Math.max(startPoint.lng, e.latlng.lng),
            ],
          ];
          setBounds(newBounds);
        }
      },
      mouseup: (e) => {
        if (isDrawing) {
          setIsDrawing(false);
          // Create resizable rectangle
          if (map && bounds) {
            // Clear existing rectangles
            map.eachLayer((layer) => {
              if (layer instanceof L.Rectangle) {
                layer.remove();
              }
            });

            // Create new resizable rectangle
            const rect = L.rectangle(bounds, {
              color: darkMode ? "#4F46E5" : "#2563EB",
              weight: 2,
              fillOpacity: 0.2,
            }).addTo(map);

            // Make it editable
            if (rect.editing) {
              rect.editing.enable();

              // Update bounds when rectangle is resized
              rect.on("edit", () => {
                const newBounds = rect.getBounds();
                setBounds([
                  [newBounds.getSouth(), newBounds.getWest()],
                  [newBounds.getNorth(), newBounds.getEast()],
                ]);
              });
            }
          }
        }
      },
    });

    return null;
  };

  const printLatLng = () => {
    if (!bounds) return;
    const [southWest, northEast] = bounds;
    const minLat = Math.min(southWest[0], northEast[0]);
    const maxLat = Math.max(southWest[0], northEast[0]);
    const minLng = Math.min(southWest[1], northEast[1]);
    const maxLng = Math.max(southWest[1], northEast[1]);
    alert(`Bounding Box:
Min Latitude: ${minLat.toFixed(6)}
Max Latitude: ${maxLat.toFixed(6)}
Min Longitude: ${minLng.toFixed(6)}
Max Longitude: ${maxLng.toFixed(6)}`);
  };

  const resetBoundingBox = () => {
    setBounds(null);
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handleSubmit = async () => {
    if (!bounds) return;
    const [southWest, northEast] = bounds;
    const minLat = Math.min(southWest[0], northEast[0]);
    const maxLat = Math.max(southWest[0], northEast[0]);
    const minLng = Math.min(southWest[1], northEast[1]);
    const maxLng = Math.max(southWest[1], northEast[1]);

    const data = {
      bbox: {
        minLat: minLat.toFixed(6),
        maxLat: maxLat.toFixed(6),
        minLng: minLng.toFixed(6),
        maxLng: maxLng.toFixed(6),
      },
      dateRange: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      },
      // Optionally add username if available
    };

    try {
      const res = await fetch('/api/map/coordinates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message + '\n' + JSON.stringify(result.bbox, null, 2));
    } catch (err) {
      alert('Failed to send coordinates');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 space-y-6">
        {/* Date Range Selection */}
        <div
          className={`p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Date Range Selection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date()}
                className={`w-full px-4 py-2.5 rounded-lg border shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500/40"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/50"
                }`}
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                className={`w-full px-4 py-2.5 rounded-lg border shadow-sm focus:ring-2 focus:ring-opacity-50 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500/40"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/50"
                }`}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div
          className={`p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Map Selection
            </h3>
            <button
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600 active:bg-gray-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
              }`}
              onClick={resetBoundingBox}
            >
              Reset Selection
            </button>
          </div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } mb-4`}
          >
            Click and drag on the map to draw a selection box. Use the corner
            handles to resize.
          </p>

          {/* Map Container */}
          <div className="rounded-lg overflow-hidden border shadow-inner">
            <MapContainer
              center={[19.07, 72.87]}
              zoom={8}
              style={{ height: "600px", width: "100%" }}
              className={`${darkMode ? "dark-map" : ""} z-0`}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <BoundingBoxDrawer />
              {bounds && (
                <Rectangle
                  bounds={bounds}
                  pathOptions={{
                    color: darkMode ? "#6366F1" : "#3B82F6",
                    weight: 2,
                    fillOpacity: 0.2,
                  }}
                />
              )}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            !bounds
              ? "bg-gray-500 cursor-not-allowed"
              : darkMode
              ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          } text-white shadow-lg shadow-blue-500/20`}
          onClick={handleSubmit}
          disabled={!bounds}
        >
          Get Satellite Data
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            !bounds
              ? "bg-gray-300 cursor-not-allowed"
              : darkMode
              ? "bg-gray-700 hover:bg-gray-600 active:bg-gray-500"
              : "bg-gray-300 hover:bg-gray-400 active:bg-gray-300"
          } ${darkMode ? "text-gray-200" : "text-gray-700"} shadow-lg`}
          onClick={printLatLng}
          disabled={!bounds}
        >
          View Coordinates
        </button>
      </div>
    </div>
  );
};

export default MapView;
