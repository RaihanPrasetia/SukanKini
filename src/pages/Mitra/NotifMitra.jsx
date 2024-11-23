import React, { useEffect, useState } from 'react';
import notifService from '../../service/notifService';
import { FiCheck } from 'react-icons/fi';


const NotifMitra = () => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all'); // Default filter

    // Fetch notifications from API
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const fetchedNotifications = await notifService.getNotifications();
                setNotifications(fetchedNotifications);
                setFilteredNotifications(fetchedNotifications); // Initialize filtered notifications
            } catch (err) {
                setError(err.message || 'Failed to fetch notifications.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    // Handle filter change
    useEffect(() => {
        if (filterType === 'all') {
            setFilteredNotifications(notifications);
        } else {
            setFilteredNotifications(
                notifications.filter((notif) => notif.type === filterType)
            );
        }
    }, [filterType, notifications]);

    // Update the notification status to 'read'
    const markAsRead = async (notifId) => {
        try {
            // Call the API to update the notification status to read
            const updatedNotif = await notifService.updateNotifications(notifId);

            // Update the state to mark the notification as read
            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) =>
                    notif.id === notifId
                        ? { ...notif, isRead: true } // Update isRead to true
                        : notif
                )
            );
            setFilteredNotifications((prevFilteredNotifications) =>
                prevFilteredNotifications.map((notif) =>
                    notif.id === notifId
                        ? { ...notif, isRead: true } // Update isRead to true in the filtered list
                        : notif
                )
            );
        } catch (err) {
            setError(err.message || 'Failed to mark as read.');
        }
    };

    if (loading) {
        return <div className="text-center py-6">Loading notifications...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-6 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-50 p-6 rounded-xl shadow-lg min-h-[80vh] py-24 lg:pt-32">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Daftar Pemberitahuan Mitra</h2>

            {/* Filter Options */}
            <div className="mb-6 text-center flex">
                <select
                    className="p-2 border rounded-md text-gray-800"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">Semua Notifikasi</option>
                    <option value="info">Info</option>
                    <option value="warning">Peringatan</option>
                    <option value="success">Sukses</option>
                </select>
            </div>

            <div className="space-y-6">
                {filteredNotifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-6 rounded-xl shadow-md ${notif.type === 'info'
                            ? 'bg-blue-100 border-l-4 border-blue-500'
                            : notif.type === 'warning'
                                ? 'bg-yellow-100 border-l-4 border-yellow-500'
                                : 'bg-green-100 border-l-4 border-green-500'
                            }`}
                    >
                        <div className="flex items-start space-x-4">
                            {/* Icon */}
                            <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${notif.type === 'info' ? 'bg-blue-500' : notif.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    {notif.type === 'info' && (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1 8h.01M12 4v4m0 8h.01"
                                        />
                                    )}
                                    {notif.type === 'warning' && (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14h2m-1-5v6m-1-7h2m-1 8h.01M12 4v4m0 8h.01"
                                        />
                                    )}
                                    {notif.type === 'success' && (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    )}
                                </svg>
                            </div>

                            {/* Notification Details */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{notif.title}</h3>
                                    <span className="text-sm text-gray-500">
                                        {notif.createdAt
                                            ? new Date(notif.createdAt).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })
                                            : 'Tanggal tidak tersedia'}
                                    </span>
                                </div>
                                <p className="text-gray-700">{notif.message}</p>

                            </div>
                            {
                                !notif.isRead && (
                                    <button
                                        onClick={() => markAsRead(notif.id)}
                                        className="mt-4 p-3 bg-blue-400 text-white rounded-md shadow-md hover:bg-blue-500 transition-all ease-in-out transform hover:scale-105 focus:outline-none"
                                    >
                                        <FiCheck className="h-6 w-6 text-white" />
                                    </button>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotifMitra;
