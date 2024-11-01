// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
