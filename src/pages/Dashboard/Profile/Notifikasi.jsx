import React, { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import notifService from '../../../service/notifService';

function Notifikasi() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); // Default filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await notifService.getNotifications();
        setNotifications(fetchedNotifications);
        setFilteredNotifications(fetchedNotifications);
      } catch (err) {
        setError(err.message || 'Failed to fetch notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Handle filter and search change
  useEffect(() => {
    let filtered = notifications;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter((notif) => notif.type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((notif) =>
        notif.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [filterType, searchQuery, notifications]);

  // Mark notification as read
  const markAsRead = async (notifId) => {
    try {
      await notifService.updateNotifications(notifId);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notifId ? { ...notif, isRead: true } : notif
        )
      );
      setFilteredNotifications((prevFilteredNotifications) =>
        prevFilteredNotifications.map((notif) =>
          notif.id === notifId ? { ...notif, isRead: true } : notif
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
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">Notifikasi</h2>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari berdasarkan judul..."
          className="p-3 border border-gray-300 rounded-lg w-full md:w-2/3 text-gray-800"
        />
      </div>

      {/* Filter Options */}
      <div className="mb-6 text-center">
        <select
          className="p-3 border border-gray-300 rounded-lg text-gray-800"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Semua Notifikasi</option>
          <option value="info">Info</option>
          <option value="warning">Peringatan</option>
          <option value="success">Sukses</option>
        </select>
      </div>

      {/* No Notifications */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">Notifikasi tidak tersedia</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Notification List */}
          {filteredNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              className={`p-4 rounded-lg shadow-sm border-l-4 transition duration-200 ease-in-out ${notif.type === 'info'
                ? 'bg-blue-50 border-blue-500'
                : notif.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-green-50 border-green-500'
                }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${notif.type === 'info'
                    ? 'bg-blue-500'
                    : notif.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                    }`}
                >
                  <FiCheck className="h-6 w-6" />
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

                {/* Mark as Read */}
                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="mt-2 p-2 bg-blue-400 text-white rounded-md shadow-md hover:bg-blue-500 transition-all ease-in-out transform hover:scale-105 focus:outline-none"
                  >
                    <FiCheck className="h-5 w-5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifikasi;
