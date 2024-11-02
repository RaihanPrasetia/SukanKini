import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Layouts/LandingPage';
import Kelas from './pages/Kelas'; 
import Membership from './pages/Membership'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/kelas" element={<Kelas />} />
                <Route path="/membership" element={<Membership />} />
            </Routes>
        </Router>
    );
};

export default App;
