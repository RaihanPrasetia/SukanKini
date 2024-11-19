import React, { useState } from "react";
import { Outlet } from 'react-router-dom';

const ProfileMitra = () => {
  // State menggunakan array untuk semua data profil
  const [profileData, setProfileData] = useState([
    { field: "name", label: "Full Name*", value: "Baihaqi Khaizan" },
    { field: "email", label: "Email Address*", value: "Khaizanbaihaqi@gmail.com" },
    { field: "phone", label: "Phone Number*", value: "088989546911" },
    { field: "location", label: "Location*", value: "Jambi" },
    { field: "city", label: "City*", value: "Jambi City" },
    { field: "address", label: "Address*", value: "Jl. Diponegoro No.12" }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (field, newValue) => {
    setProfileData((prevData) =>
      prevData.map((item) =>
        item.field === field ? { ...item, value: newValue } : item
      )
    );
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement search logic here
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
    console.log("Profile updated:", profileData);
    // Implement update logic here
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset changes if needed
  };

  return (
    <div className="flex flex-col md:flex-row py-24 lg:py-32 px-6 lg:px-16 space-y-4 md:space-y-0 md:space-x-6 min-h-[80vh]">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex-grow bg-white shadow-lg rounded-lg p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-yellow-500"
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{profileData.find(item => item.field === "name")?.value}</h2>
                <p className="text-gray-600">{profileData.find(item => item.field === "location")?.value}, Indonesia</p>
                <button
                  onClick={handleEditClick}
                  className="mt-2 px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex w-full md:w-1/3 mt-4 md:mt-0 justify-end items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSearch}
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white grid items-center justify-center gap-4 grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg p-6">
          {/* Dynamic Profile Form */}
          {profileData.map((item) => (
            <div key={item.field}>
              <label className="block text-gray-700">{item.label}</label>
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleInputChange(item.field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={!isEditing}
              />
            </div>
          ))}
          {/* Update and Cancel Buttons */}
          {isEditing && (
            <div className="flex space-x-4 mt-4 col-span-2">
              <button
                onClick={handleUpdateClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Update
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Batalkan
              </button>
            </div>
          )}
        </div>
        {/* This Outlet will render any child routes like ClassList, Notifications, etc. */}
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileMitra;
