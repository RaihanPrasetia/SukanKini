import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import HomeMitra from '../Mitra/HomeMitra';
import MitraNavbar from '../../components/Navbar/MitraNavbar';
import ProfileMitra from '../Mitra/ProfileMitra';
import KelasMitra from '../Mitra/KelasMitra';
import Trainer from '../Mitra/Trainer';
import NotifMitra from '../Mitra/NotifMitra';
import Pembayaran from '../Mitra/Pembayaran';
import DetailKelas from '../Mitra/DetailKelas';
import Category from '../Mitra/Category';
import Bank from '../Mitra/Bank';
import NotFound from '../../components/NotFound';

import paymentService from '../../service/paymentService';

const Mitra = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isPaymentActive, setIsPaymentActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const payments = await paymentService.getPaymentStatus();
                if (payments && payments.length > 0) {
                    const activePayment = payments[0];
                    setIsPaymentActive(activePayment.paymentStatus === 'Diterima');
                }
            } catch (error) {
                console.error('Error fetching payment status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkPaymentStatus();
    }, []);

    // Daftar rute valid untuk membedakan NotFound
    const validRoutes = [
        '/mitra/home',
        '/mitra/profile',
        '/mitra/kelas',
        '/mitra/trainer',
        '/mitra/category',
        '/mitra/notif',
        '/mitra/pembayaran',
        '/mitra/bank',
    ];

    // Halaman dianggap NotFound jika tidak ada dalam validRoutes dan tidak dimulai dengan rute dinamis
    const isNotFoundPage =
        !validRoutes.includes(location.pathname) &&
        !location.pathname.startsWith('/mitra/kelas/') &&
        !location.pathname.startsWith('/mitra/profile/');

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex items-center space-x-2">
                    <div className="loader"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isPaymentActive) {
        return <Navigate to="/konfimasi/payment" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar hanya dirender jika bukan halaman NotFound */}
            {!isNotFoundPage && (
                <MitraNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            )}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64 ml-0' : 'ml-0'
                }`}>
                <Routes>
                    <Route path="/home" element={<HomeMitra />} />
                    <Route path="/profile" element={<ProfileMitra />} />
                    <Route path="/kelas" element={<KelasMitra />} />
                    <Route path="/kelas/:id" element={<DetailKelas />} />
                    <Route path="/trainer" element={<Trainer />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/notif" element={<NotifMitra />} />
                    <Route path="/pembayaran" element={<Pembayaran />} />
                    <Route path="/bank" element={<Bank />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
            {/* Footer hanya dirender jika bukan halaman NotFound */}
            {!isNotFoundPage && <Footer />}
        </div>
    );
};

export default Mitra;
