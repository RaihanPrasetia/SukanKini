// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header.jsx';
import ThemeToggleButton from './components/ThemeToggleButton';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <div className='bg-white dark:bg-gray-800 min-h-screen'>
      <Router>
        <Header />
        <div className="flex justify-center">
          <ThemeToggleButton />
        </div>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
