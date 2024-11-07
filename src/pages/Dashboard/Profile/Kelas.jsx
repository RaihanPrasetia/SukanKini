import React, { useState } from 'react';

const Kelas = () => {
  const [classDetails] = useState({
    name: 'CARDIO',
    location: 'Abadi Suite Jambi',
    time: '06.00 - 22.00 WIB',
    image: 'https://images.unsplash.com/photo-1550977616-efc580084ac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyZGlvfGVufDB8fDB8fHww',
  });

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow-lg">
      {/* Class Information Section with Entrance Animation */}
      <div className="bg-white p-4 rounded-lg border border-yellow-400 shadow-lg transform transition duration-700 hover:scale-105 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-green-700 animate__animated animate__fadeIn">Informasi Kelas Saya</h3>
        <p className="text-gray-600 animate__animated animate__fadeIn">{`Kelas: ${classDetails.name}`}</p>
        
        <div className="mt-4 flex items-center space-x-4">
          <img
            src={classDetails.image}
            alt={`${classDetails.name} Class`}
            className="w-32 h-20 rounded-lg shadow-md object-cover transform transition duration-500 hover:scale-110 hover:rotate-3"
          />
          <div>
            <h4 className="text-lg font-semibold animate__animated animate__fadeIn">{classDetails.name}</h4>
            <div className="flex items-center mt-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8c0-1.1.9-2 2-2s2 .9 2 2-1.7 6.2-2.5 8.5S15 22 12 22s-3.4-.7-5-3.5S4 9 4 8s.9-2 2-2 2 .9 2 2"/>
              </svg>
              <p>{classDetails.location}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 14h10a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2z"/>
              </svg>
              <p>{classDetails.time}</p>
            </div>
          </div>
        </div>

        {/* Join Kelas Button with Hover Animation */}
        <button 
          className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-lg shadow-md transform transition duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-xl"
        >
          Join Kelas
        </button>
      </div>
    </div>
  );
};

export default Kelas;
