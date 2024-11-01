// src/routes/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Komunitas from '../pages/Komunitas';
import Pelatih from '../pages/Pelatih';
import Kelas from '../pages/Kelas';
import Membership from '../pages/Membership';
import Dashboard from '../pages/Dashboard';

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/komunitas" element={<Komunitas />} />
                <Route path="/pelatih" element={<Pelatih />} />
                <Route path="/kelas" element={<Kelas />} />
                <Route path="/membership" element={<Membership />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default AppRoutes;
