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
        <div className="w-full bg-gray-50 p-6 rounded-lg shadow-lg min-h-[80vh]  py-24 lg:pt-32">
            <h2 className="text-3xl font-semibold mb-6">Daftar Pemberitahuan Mitra</h2>

            {/* Notification List */}
            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-4 rounded-lg shadow-sm ${notif.type === 'info' ? 'bg-blue-50' : notif.type === 'warning' ? 'bg-yellow-50' : 'bg-green-50'}`}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">{notif.title}</h3>
                            <span className="text-sm text-gray-500">{notif.date}</span>
                        </div>
                        <p className="mt-2 text-gray-700">{notif.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotifMitra;
