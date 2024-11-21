import React, { useState } from 'react';
import {FaSearch } from 'react-icons/fa';

const App = () => {
  const [data] = useState([
    { id: 1, nama: 'Benediktus Prayoga', email: 'benediktus@example.com', noTelepon: '081234567890', bankTujuan: 'Bank A', buktiPembayaran: 'bukti1.jpg', status: 'Pending', total: 'Rp 1.000.000' },
    { id: 2, nama: 'Rama Dhani', email: 'rama@example.com', noTelepon: '081234567891', bankTujuan: 'Bank B', buktiPembayaran: 'bukti2.jpg', status: 'Pending', total: 'Rp 2.000.000' },
    { id: 3, nama: 'Dio Maulana Nurjayadi', email: 'dio@example.com', noTelepon: '081234567892', bankTujuan: 'Bank C', buktiPembayaran: 'bukti3.jpg', status: 'Pending', total: 'Rp 1.500.000' },
    { id: 4, nama: 'Muhamad Rifky Fahriza', email: 'rifky@example.com', noTelepon: '081234567893', bankTujuan: 'Bank D', buktiPembayaran: 'bukti4.jpg', status: 'Pending', total: 'Rp 1.250.000' },
    { id: 5, nama: 'Fadhil Nugraha', email: 'fadhil@example.com', noTelepon: '081234567894', bankTujuan: 'Bank E', buktiPembayaran: 'bukti5.jpg', status: 'Pending', total: 'Rp 3.000.000' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewedItem, setViewedItem] = useState(null);

  const handleApprove = (id) => {
    console.log(`Disetujui item dengan ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Ditolak item dengan ID: ${id}`);
  };

  const handleView = (item) => {
    setViewedItem(item);
  };

  const handleClose = () => {
    setViewedItem(null);
  };



  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main main className="flex-1" >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">DATA PEMBAYARAN</h1>

      <div className="  rounded-lg">
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Cari nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition-all duration-200 ease-in">
            <FaSearch />
          </button>
        </div>

        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className='bg-indigo-500 text-white'>
              <th className="border-b px-4 py-2 text-left">No</th>
              <th className="border-b px-4 py-2 text-left">Nama</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">No Telepon</th>
              <th className="border-b px-4 py-2 text-left">Status</th>
              <th className="border-b px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2 text-center">{index + 1}</td>
                <td className="border-b px-4 py-2">{item.nama}</td>
                <td className="border-b px-4 py-2">{item.email}</td>
                <td className="border-b px-4 py-2">{item.noTelepon}</td>
                <td className="border-b px-4 py-2">{item.status}</td>
                <td className="border-b px-4 py-2 text-center">
                  <div className="flex space-x-3 justify-center">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200" onClick={() => handleApprove(item.id)}>
                      Disetujui
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200" onClick={() => handleReject(item.id)}>
                      Ditolak
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200" onClick={() => handleView(item)}>
                      Lihat
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        viewedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-indigo-600">Detail Pembayaran</h2>
                <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>

              <div className="space-y-4">
                <p><strong>Nama:</strong> {viewedItem.nama}</p>
                <p><strong>Email:</strong> {viewedItem.email}</p>
                <p><strong>No Telepon:</strong> {viewedItem.noTelepon}</p>
                <p><strong>Status:</strong> {viewedItem.status}</p>
                <p><strong>Bank Tujuan:</strong> {viewedItem.bankTujuan}</p>
                <p><strong>Bukti Pembayaran:</strong> <img src={viewedItem.buktiPembayaran} alt="Bukti Pembayaran" className="w-32 h-32 object-cover" /></p>
                <p><strong>Total:</strong> {viewedItem.total}</p>
              </div>
            </div>
          </div>
        )
      }
    </main >
  );
};

export default App;
