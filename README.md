
 Project Overview
KIAAR Dashboard is a GIS (Geographic Information System) analytics platform that allows users to monitor and analyze geospatial data related to vegetation health, water stress, and land classification.

 Technical Stack
1. Frontend (Client):
   - React with Vite as the build tool
   - TailwindCSS for styling
   - Leaflet.js for interactive maps
   - Chart.js for data visualization
   - React components are written in JSX
   - Dark mode support

2. **Backend (Server)**:
   - Node.js with Express
   - MongoDB with Mongoose for data persistence
   - Authentication system with bcrypt for password hashing
   - RESTful API architecture

### Key Features

1. **Authentication System**
   - User registration and login functionality
   - Secure password hashing with bcrypt
   - Session management

2. Interactive Map (MapView)
   - Leaflet.js integration
   - Drawing and editing bounding boxes
   - Multiple map layers
   - Coordinate selection and visualization
   - Date range selection for data analysis

3. Dashboard
   - Real-time analytics display
   - Key metrics visualization
   - Data filtering by region and time period
   - Charts for:
     - Vegetation health indices (NDVI, EVI, SAVI)
     - Water stress indices
     - Land classification data

4. Data Management
   - Dataset CRUD operations
   - Import/Export functionality
   - Search and filtering capabilities
   - Status tracking for datasets
   - File size and last updated information

5. Data Visualization
   - Interactive charts and graphs
   - Multiple visualization types
   - Time-series data display
   - Custom ChartBox component using Chart.js

6. User Interface
   - Responsive design
   - Dark/Light mode toggle
   - Collapsible sidebar
   - Clean and modern UI with Tailwind CSS
   - User-friendly navigation

Project Structure

1. Client Structure:
```
client/
├── src/
│   ├── components/
│   │   ├── AuthForm.jsx
│   │   ├── ChartBox.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DataManagement.jsx
│   │   ├── DataVisualization.jsx
│   │   ├── Header.jsx
│   │   ├── InteractiveMap.jsx
│   │   ├── LandingPage.jsx
│   │   ├── MapView.jsx
│   │   ├── Sidebar.jsx
│   │   └── Tools.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

2. Server Structure:
```
server/
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   ├── IndexesData.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── map.js
│   ├── db/
│   │   └── dbConnect.js
│   ├── app.js
│   └── index.js
```

Future Development (from README.md)
1. Backend Tasks:
   - Update `/api/map/coordinates` endpoint to integrate with ML model
   - Store ML model responses in IndexesData collection
   - Create new endpoint for fetching processed data

2. Frontend Tasks:
   - Update dashboard components to handle ML model data
   - Implement data fetching and display from new endpoints

3. General Improvements:
   - Enhanced error handling
   - Loading states
   - User feedback
   - Authentication checks for protected routes

This is a GIS dashboard application with a robust architecture, modern UI, and extensive features for geospatial data analysis and visualization.
