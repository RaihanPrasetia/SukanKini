import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; 

const Profile = () => {
  const [name, setName] = useState("Baihaqi Khaizan");
  const [email, setEmail] = useState("Khaizanbaihaqi@gmail.com");
  const [phone, setPhone] = useState("088989546911");
  const [location, setLocation] = useState("Jambi");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement search logic here
  };

  return (
    <div className="flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-4">
      {/* Sidebar Navigation */}
      <Sidebar /> {/* Sidebar component displayed here */}

      {/* Main Profile Section */}
      <div className="flex-grow bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Search Bar */}
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Search
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-yellow-500"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">{location}, Indonesia</p>
            <button className="mt-2 px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="flex items-center justify-center space-x-4">
          <button className="bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-600 transition duration-200">
            Upload Image
          </button>
          <button className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600 transition duration-200">
            Delete Image
          </button>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Full Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email Address*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number*</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Location*</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
