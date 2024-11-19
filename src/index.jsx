import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Ambil elemen root dari DOM
const rootElement = document.getElementById('root');

// Buat instance root
const root = createRoot(rootElement);

// Render aplikasi menggunakan createRoot
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
