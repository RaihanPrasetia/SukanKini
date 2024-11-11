import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './pages/Layouts/AuthContext';

function App() {
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen scroll-smooth">
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
