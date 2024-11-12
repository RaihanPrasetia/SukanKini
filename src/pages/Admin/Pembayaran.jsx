import React, { useState } from 'react';

const App = () => {
const [data, setData] = useState([
{ id: 1, nama: 'Benediktus Prayoga', email: 'benediktus@example.com', noTelepon: '081234567890', bankTujuan: 'Bank A',
buktiPembayaran: 'bukti1.jpg', status: 'Pending', total: 'Rp 1.000.000' },
{ id: 2, nama: 'Rama Dhani', email: 'rama@example.com', noTelepon: '081234567891', bankTujuan: 'Bank B',
buktiPembayaran: 'bukti2.jpg', status: 'Pending', total: 'Rp 2.000.000' },
{ id: 3, nama: 'Dio Maulana Nurjayadi', email: 'dio@example.com', noTelepon: '081234567892', bankTujuan: 'Bank C',
buktiPembayaran: 'bukti3.jpg', status: 'Pending', total: 'Rp 1.500.000' },
{ id: 4, nama: 'Muhamad Rifky Fahriza', email: 'rifky@example.com', noTelepon: '081234567893', bankTujuan: 'Bank D',
buktiPembayaran: 'bukti4.jpg', status: 'Pending', total: 'Rp 1.250.000' },
{ id: 5, nama: 'Fadhil Nugraha', email: 'fadhil@example.com', noTelepon: '081234567894', bankTujuan: 'Bank E',
buktiPembayaran: 'bukti5.jpg', status: 'Pending', total: 'Rp 3.000.000' },
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

const sidebarItems = ['Dashboard', 'Profil Karyawan', 'Pembayaran', 'Logout'];

const filteredData = data.filter((item) =>
item.nama.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
<div className="flex min-h-screen bg-gray-200">
  <aside className="w-64 bg-white shadow-xl p-6 rounded-r-2xl flex flex-col items-center">
    <img
      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="User Avatar" className="rounded-full border-4 border-indigo-500 mb-4" />
    <h2 className="text-2xl font-bold text-gray-700">Tegar</h2>
    <p className="text-gray-400 mb-6">Admin</p>
    <nav className="w-full space-y-3">
      {sidebarItems.map((item, index) => (
      <button key={index}
        className="w-full flex items-center text-gray-700 px-4 py-2 text-lg hover:bg-indigo-100 hover:text-indigo-700 rounded-lg transition-all duration-300 ease-in-out">
        <span className="mr-2">📄</span> {item}
      </button>
      ))}
    </nav>
  </aside>

  <main className="flex-1 p-6">
    <h1 className="text-2xl font-bold mb-4">DATA PEMBAYARAN</h1>

    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center mb-4">
        <input type="text" placeholder="Cari nama..." value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-l px-4 py-2 w-full"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r">🔍</button>
      </div>

      <table className="table-auto w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">No Telepon</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
          <tr key={item.id}>
            <td className="border px-4 py-2 text-center">{index + 1}</td>
            <td className="border px-4 py-2">{item.nama}</td>
            <td className="border px-4 py-2">{item.email}</td>
            <td className="border px-4 py-2">{item.noTelepon}</td>
            <td className="border px-4 py-2">{item.status}</td>
            <td className="border px-4 py-2 text-center">
              <div className="flex space-x-2 justify-center">
                <button className="bg-green-400 text-white px-2 py-1 rounded" onClick={()=>
                  handleApprove(item.id)}>Disetujui</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={()=>
                  handleReject(item.id)}>Ditolak</button>
                <button className="bg-blue-400 text-white px-2 py-1 rounded" onClick={()=>
                  handleView(item)}>Lihat</button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button className="bg-blue-500 text-white rounded px-4 py-1" onClick={()=> console.log('Tambah Data')}>Tambah
          Data</button>
        <div className="flex space-x-1">
          <button className="px-2">«</button>
          <span className="px-2">1</span>
          <button className="px-2">»</button>
        </div>
      </div>
    </div>

    {viewedItem && (
    <div
      className="mt-6 bg-white p-6 rounded-lg shadow-xl transition-all transform duration-500 ease-in-out animate-dropdown">
      <h2 className="text-xl font-semibold mb-6 text-indigo-600">Detail Pembayaran</h2>

      <div className="space-y-4">
        <p className="text-[16px] font-medium text-gray-800"><strong>Nama:</strong> <span
            className="font-normal text-gray-600">{viewedItem.nama}</span></p>
        <p className="text-[16px] font-medium text-gray-800"><strong>Email:</strong> <span
            className="font-normal text-gray-600">{viewedItem.email}</span></p>
        <p className="text-[16px] font-medium text-gray-800"><strong>No Telepon:</strong> <span
            className="font-normal text-gray-600">{viewedItem.noTelepon}</span></p>
        <p className="text-[16px] font-medium text-gray-800"><strong>Status:</strong> <span
            className="font-normal text-gray-600">{viewedItem.status}</span></p>
        <p className="text-[16px] font-medium text-gray-800"><strong>Bank Tujuan:</strong> <span
            className="font-normal text-gray-600">{viewedItem.bankTujuan}</span></p>
        <p className="text-[16px] font-medium text-gray-800"><strong>Total Pembayaran:</strong> <span
            className="font-normal text-gray-600">{viewedItem.total}</span></p>
      </div>

      <div className="mt-6">
        <p className="text-[16px] font-medium text-gray-800"><strong>Bukti Pembayaran:</strong></p>
        {viewedItem.buktiPembayaran && (
        <img src={`https://via.placeholder.com/150?text=${viewedItem.buktiPembayaran}`} alt="Bukti Pembayaran"
          className="mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300" />
        )}
      </div>
    </div>
    )}


  </main>
</div>
);
};

export default App;