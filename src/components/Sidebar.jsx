import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="flex flex-col space-y-4 w-full md:w-1/4 p-4 bg-white rounded-lg shadow-lg">
      <Link
        to="/profile"
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
      >
        Profile
      </Link>
      <Link
        to="/notifications"
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
      >
        Notifications
      </Link>
      <Link
        to="/payments"
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
      >
        Payments
      </Link>
      <Link
        to="/my-classes"
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
      >
        My Classes
      </Link>
      <Link
        to="/delete-account"
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
      >
        Delete Account
      </Link>
    </div>
  );
}

export default Sidebar;
