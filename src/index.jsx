import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Ambil elemen root dari DOM
const rootElement = document.getElementById('root');

// Buat instance root
const root = createRoot(rootElement);

// Fetch the Google Client ID from environment variables
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log(clientId); // This will print the clientId if it's set correctly

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
