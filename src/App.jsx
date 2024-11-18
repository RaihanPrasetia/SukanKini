import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import paymentService from './service/paymentService'; // Correct import
import LandingPage from './pages/Layouts/LandingPage';
import Dashboard from './pages/Layouts/Dashboard';
import Admin from './pages/Layouts/Admin';
import Mitra from './pages/Layouts/Mitra';
import Payment from './pages/Mitra/Payment';
import ProtectedRoute from './contexts/ProtectedRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Profile from './pages/Admin/Profile';
import Pembayaran from './pages/Admin/Pembayaran';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  useEffect(() => {
    const checkUserPaymentStatus = async () => {
      try {
        const payments = await paymentService.getPayments(); // Fetch payments
        if (payments && payments.length > 0) {
          // Access the first payment
          const activePayment = payments[0];  // First payment in the list
          setIsPaymentActive(activePayment.paymentStatus === 'Diterima'); // Check if the first payment is accepted
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    checkUserPaymentStatus();  // Check payment status on component mount
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen scroll-smooth">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="*"
            element={
              <ProtectedRoute requiredRole="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/pembayaran" element={<Pembayaran />} />

          <Route
            path="/mitra/*"
            element={
              isPaymentActive ? (
                <ProtectedRoute requiredRole="mitra">
                  <Mitra />
                </ProtectedRoute>
              ) : (
                <ProtectedRoute requiredRole="mitra">
                  <Payment />
                </ProtectedRoute>  // Inform user about payment status
              )
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
