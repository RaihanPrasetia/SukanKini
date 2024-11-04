import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("Baihaqi Khaizan");
  const [email, setEmail] = useState("Khaizanbaihaqi@gmail.com");
  const [phone, setPhone] = useState("088989546911");
  const [location, setLocation] = useState("Jambi");

  return (
    <div className="min-h-full flex bg-pink-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul className="space-y-4">
          <li>
            <a href="#profile" className="text-green-600 font-medium hover:text-green-800">
              Profile
            </a>
          </li>
          <li>
            <a href="#notifications" className="text-gray-600 font-medium hover:text-green-800">
              Notifications
            </a>
          </li>
          <li>
            <a href="#payments" className="text-gray-600 font-medium hover:text-green-800">
              Payments
            </a>
          </li>
          <li>
            <a href="#my-classes" className="text-gray-600 font-medium hover:text-green-800">
              My Classes
            </a>
          </li>
          <li>
            <a href="#delete-account" className="text-red-500 font-medium hover:text-red-700">
              Delete Account
            </a>
          </li>
        </ul>
      </div>

      {/* Main Profile Section */}
      <div className="flex-grow flex items-center justify-center p-8 bg-pink-100">
      <div className="bg-white shadow-lg rounded-lg p-6" style={{ width: '150vh', height: '100vh' }}>
          {/* Header */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image source
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-yellow-500"
            />
            <div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-gray-600">Jambi, Indonesia</p>
              <button className="mt-2 px-4 py-1 bg-green-500 text-white rounded-md">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <button className="bg-green-500 px-4 py-2 text-white rounded-md">
                Upload Image
              </button>
              <button className="bg-red-500 px-4 py-2 text-white rounded-md">
                Delete Image
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Full Name*</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number*</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Location*</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
