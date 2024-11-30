import React, { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import notifService from "../../../service/notifService";

function Notifikasi() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all"); // Default filter
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await notifService.getNotifications();
        setNotifications(fetchedNotifications);
        setFilteredNotifications(fetchedNotifications);
      } catch (err) {
        setError(err.message || "Failed to fetch notifications.");
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
    if (filterType !== "all") {
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
      setError(err.message || "Failed to mark as read.");
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full px-6 py-8 bg-gray-50">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
        Notifikasi
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari berdasarkan judul..."
          className="p-4 border border-gray-300 rounded-lg w-full md:w-2/3 lg:w-1/2 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Options */}
      <div className="mb-6 flex justify-center">
  <div className="relative w-full md:w-1/2 lg:w-1/3">
    <select
      className="p-4 pr-10 border border-gray-300 rounded-lg text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all ease-in-out transform hover:scale-105"
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
    >
      <option value="all">Semua Notifikasi</option>
      <option value="info">Info</option>
      <option value="warning">Peringatan</option>
      <option value="success">Sukses</option>
    </select>
    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-down"
        viewBox="0 0 16 16"
      >
        <path d="M1.5 5.5a.5.5 0 0 1 .707 0L8 10.293l5.793-5.793a.5.5 0 1 1 .707.707l-6 6a.5.5 0 0 1-.707 0l-6-6a.5.5 0 0 1 0-.707z" />
      </svg>
    </span>
  </div>
</div>


      {/* No Notifications */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center p-8 bg-gray-200 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">
            Tidak ada notifikasi tersedia
          </h3>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Notification List */}
          {filteredNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              className={`p-6 rounded-lg shadow-lg border-l-4 transition duration-300 ease-in-out transform hover:scale-105 ${
                notif.type === "info"
                  ? "bg-blue-50 border-blue-500"
                  : notif.type === "warning"
                  ? "bg-yellow-50 border-yellow-500"
                  : "bg-green-50 border-green-500"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-white ${
                    notif.type === "info"
                      ? "bg-blue-500"
                      : notif.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  <FiCheck className="h-6 w-6" />
                </div>

                {/* Notification Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {notif.title}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {notif.createdAt
                        ? new Date(notif.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Tanggal tidak tersedia"}
                    </span>
                  </div>
                  <p className="text-gray-700">{notif.message}</p>
                </div>

                {/* Mark as Read */}
                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="mt-2 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all ease-in-out transform hover:scale-105 focus:outline-none"
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
