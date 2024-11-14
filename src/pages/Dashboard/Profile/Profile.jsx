import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Navbar/Sidebar';

const Profile = () => {
  const [name, setName] = useState("Baihaqi Khaizan");
  const [email, setEmail] = useState("Khaizanbaihaqi@gmail.com");
  const [phone, setPhone] = useState("088989546911");
  const [location, setLocation] = useState("Jambi");
  const [dob, setDob] = useState("1995-04-01");
  const [gender, setGender] = useState("Male");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateAccount = () => {
    console.log("Account updated:", { name, email, phone, location, dob, gender });
    alert("Account updated successfully!");
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion initiated");
    alert("Are you sure you want to delete your account?");
  };

  return (
    <div className="w-full  flex flex-col md:flex-row py-6 space-y-7 md:space-y-0 md:space-x-4 pt-20">
      <Sidebar className="w-full md:w-1/4 lg:w-1/5" />
      <div className="flex flex-col space-y-4 w-full md:w-3/4 lg:w-4/5">
        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-500"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-600">{location}, Indonesia</p>
                <div className="flex flex-col sm:flex-row sm:space-x-2 mt-2">
                  <button
                    onClick={handleToggleDetails}
                    className={`px-4 py-1 text-white rounded-lg text-[16px] font-semibold ${showDetails ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  >
                    {showDetails ? "Tutup Detail" : "Detail Profile"}
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-500 text-white text-[16px] font-semibold px-4 py-1 mt-2 sm:mt-0 rounded-lg"
                  >
                    Hapus Akun
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-1/3 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full sm:flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSearch}
                className="bg-green-500 text-white px-4 py-2 text-[16px] font-semibold rounded-md"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Detail Profile Section */}
        {showDetails && (
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Detail Profile</h3>
              <button
                onClick={handleEditProfile}
                className={`px-4 py-1 text-white rounded-md text-[16px] font-semibold ${isEditing ? 'bg-red-500' : 'bg-yellow-500'}`}
              >
                {isEditing ? "Batal Edit" : "Edit"}
              </button>
            </div>

            {/* Editing Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Full Name*</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number*</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Location*</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Date of Birth*</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Gender*</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="mt-4 flex">
                <button
                  onClick={handleUpdateAccount}
                  className="bg-green-500 text-white px-4 py-2 text-[16px] font-semibold rounded-lg"
                >
                  Perbaharui
                </button>
              </div>
            )}
          </div>
        )}

        {/* Outlet for additional routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
