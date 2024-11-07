import React, { useState } from 'react';

const Setting = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notifications, setNotifications] = useState(true);
    const [privacy, setPrivacy] = useState('public');

    const handleSave = (e) => {
        e.preventDefault();
        // Logika untuk menyimpan pengaturan
        console.log({ username, email, notifications, privacy });
        alert('Settings saved!');
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="mb-6">Manage your account settings here.</p>
            
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        placeholder="Enter your username" 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        placeholder="Enter your email" 
                    />
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={notifications} 
                            onChange={(e) => setNotifications(e.target.checked)} 
                            className="mr-2" 
                        />
                        Enable Notifications
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Privacy</label>
                    <select 
                        value={privacy} 
                        onChange={(e) => setPrivacy(e.target.value)} 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default Setting;
