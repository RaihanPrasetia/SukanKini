import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Notifikasi() {
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching notifications
  useEffect(() => {
    const fetchedNotifications = [
      { id: 1, message: 'You have a new message' },
      { id: 2, message: 'Your class has been updated' },
      { id: 3, message: 'A new notification for you' },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  return (
    <div className="lg:p-6 p-0">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center animate__animated animate__fadeIn">Pemberitahuan</h1>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Link
              key={notification.id}
              to={`/profile/notifikasi/${notification.id}`} // Link to detailed view
              className="block bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out  hover:bg-green-50"
            >
              <p className="text-green-700 text-lg">{notification.message}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No notifications available</p>
        )}
      </div>
    </div>
  );
}

export default Notifikasi;