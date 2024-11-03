// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is in the same components directory
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
