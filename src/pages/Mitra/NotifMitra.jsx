import React from 'react';

const NotifMitra = () => {
    // Sample notification data
    const notifications = [
        {
            id: 1,
            title: 'Pendaftaran Kelas Baru Dibuka!',
            description: 'Pendaftaran untuk kelas Yoga for Beginners sudah dibuka. Segera daftarkan diri Anda!',
            date: '12 November 2024',
            type: 'info',
        },
        {
            id: 2,
            title: 'Update Jadwal Kelas',
            description: 'Jadwal kelas Advanced Programming mengalami perubahan. Silakan cek update terbaru.',
            date: '10 November 2024',
            type: 'warning',
        },
        {
            id: 3,
            title: 'Kelas Anda Telah Dikonfirmasi',
            description: 'Kelas Yoga for Beginners Anda telah berhasil dikonfirmasi. Segera cek jadwal dan lokasi.',
            date: '8 November 2024',
            type: 'success',
        },
        // Add more notifications as needed
    ];

    return (
        <div className="w-full bg-gray-50 p-6 rounded-xl shadow-lg min-h-[80vh] py-24 lg:pt-32">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Daftar Pemberitahuan Mitra</h2>

            {/* Notification List */}
            <div className="space-y-6">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-6 rounded-xl shadow-md ${
                            notif.type === 'info'
                                ? 'bg-blue-100 border-l-4 border-blue-500'
                                : notif.type === 'warning'
                                ? 'bg-yellow-100 border-l-4 border-yellow-500'
                                : 'bg-green-100 border-l-4 border-green-500'
                        }`}
                    >
                        <div className="flex items-start space-x-4">
                            {/* Icon */}
                            <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                                    notif.type === 'info' ? 'bg-blue-500' : notif.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
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
                                    <span className="text-sm text-gray-500">{notif.date}</span>
                                </div>
                                <p className="text-gray-700">{notif.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotifMitra;
