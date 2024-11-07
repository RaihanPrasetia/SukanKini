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
    setIsEditing(!isEditing); // Mengubah status antara edit dan batal
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
    <div className="flex flex-col md:flex-row py-10 px-16 space-y-4 md:space-y-0 md:space-x-4 pt-28 ">
      <Sidebar />
      <div className="flex flex-col space-y-6 w-full ">
        {/* Profile Card */}
        <div className=" bg-white shadow-xl rounded-lg p-6 space-y-6 transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-yellow-500 transform transition duration-300 ease-in-out hover:scale-105"
              />
              <div>
                <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-600">{location}, Indonesia</p>
                <button
                  onClick={handleToggleDetails}
                  className={`mt-2 mr-2 px-4 py-1 text-white rounded-lg transition   ${showDetails ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                >
                  {showDetails ? "Tutup Detail" : "Detail Profile"}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 "
                >
                  Hapus Akun
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex w-1/3 justify-end items-end">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-300 hover:scale-105"
              />
              <button
                onClick={handleSearch}
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 transform hover:scale-110"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Detail Profile Section */}
        {showDetails && (
          <div className="bg-white shadow-lg rounded-lg p-6 ease-in-out hover:scale-105 duration-1000 animate__animated animate__fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">Detail Profile</h3>
              <button
                onClick={handleEditProfile}
                className={`px-4 py-1 text-white rounded-md transition duration-200 transform hover:scale-110 ${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
              >
                {isEditing ? "Batal Edit" : "Edit"}
              </button>
            </div>

            {/* Editing Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Full Name*</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-300`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-300`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number*</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-300`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Location*</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-300`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Date of Birth*</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-300`}
                />
              </div>
              <div>
                <label className="block text-gray-700">Gender*</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transform transition duration-300`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleUpdateAccount}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 transform hover:scale-110"
                >
                  Update Akun
                </button>

              </div>
            )}
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
