import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="flex flex-col space-y-4 w-full md:w-1/4 p-4 bg-white rounded-lg shadow-lg">
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md ${
            isActive
              ? 'bg-green-600 shadow-lg scale-105' // Active link style
              : 'hover:bg-green-600 hover:shadow-lg hover:scale-105'
          } transition duration-300 ease-in-out transform`
        }
        end // Make sure only the exact match is active for '/profile'
      >
        Profile
      </NavLink>
      <NavLink
        to="/profile/kelas"
        className={({ isActive }) =>
          `w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md ${
            isActive
              ? 'bg-green-600 shadow-lg scale-105' // Active link style
              : 'hover:bg-green-600 hover:shadow-lg hover:scale-105'
          } transition duration-300 ease-in-out transform`
        }
      >
        Kelas Saya
      </NavLink>
      <NavLink
        to="/profile/notifikasi"
        className={({ isActive }) =>
          `w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md ${
            isActive
              ? 'bg-green-600 shadow-lg scale-105' // Active link style
              : 'hover:bg-green-600 hover:shadow-lg hover:scale-105'
          } transition duration-300 ease-in-out transform`
        }
      >
        Pemberitahuan
      </NavLink>
      <NavLink
        to="/profile/pembayaran"
        className={({ isActive }) =>
          `w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md ${
            isActive
              ? 'bg-green-600 shadow-lg scale-105' // Active link style
              : 'hover:bg-green-600 hover:shadow-lg hover:scale-105'
          } transition duration-300 ease-in-out transform`
        }
      >
        Pembayaran
      </NavLink>
    </div>
  );
}

export default Sidebar;
