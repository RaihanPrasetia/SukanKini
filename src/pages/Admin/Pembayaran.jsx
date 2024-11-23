import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import adminPaymentService from "../../service/admin/adminPaymentService";
import Swal from "sweetalert2";

const PembayaranAdmin = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // State untuk melacak loading per aksi
  const [searchTerm, setSearchTerm] = useState('');
  const [viewedItem, setViewedItem] = useState(null);

  // Fetch payment data
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const paymentData = await adminPaymentService.getAdminPayments();
        const formattedPayments = paymentData.map((payment) => ({
          id: payment.id,
          nama: payment.from?.name || "Tidak ada nama",
          email: payment.from?.email || "Tidak ada email",
          noTelepon: payment.from?.phoneNumber || "-",
          status: payment.paymentStatus || "Diproses",
          total: payment.total || 0,
          buktiPembayaran: payment.paymentProof || "",
          bankTujuan: payment.bank?.bankBrand || "Tidak ada bank",
          namaRekening: payment.bank?.accountName || "Tidak ada nama rekening",
          noRekening: payment.bank?.accountNumber || "-",
        }));
        setPayments(formattedPayments);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Gagal mengambil data pembayaran.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id); // Set action loading untuk tombol ini
    try {
      const updatedPayment = await adminPaymentService.updateAdminPaymentById({
        paymentId: id,
        status: "Diterima",
      });
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === id ? { ...payment, status: updatedPayment.paymentStatus } : payment
        )
      );
      Swal.fire("Berhasil", "Pembayaran diterima.", "success");
    } catch (error) {
      Swal.fire("Error", "Gagal menyetujui pembayaran.", "error");
    } finally {
      setActionLoading(null); // Reset action loading
    }
  };
  console.log(viewedItem)


  const handleReject = async (id) => {
    setActionLoading(id); // Set action loading untuk tombol ini
    try {
      const updatedPayment = await adminPaymentService.updateAdminPaymentById({
        paymentId: id,
        status: "Ditolak",
      });
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === id ? { ...payment, status: updatedPayment.paymentStatus } : payment
        )
      );
      Swal.fire("Berhasil", "Pembayaran ditolak.", "success");
    } catch (error) {
      Swal.fire("Error", "Gagal menolak pembayaran.", "error");
    } finally {
      setActionLoading(null); // Reset action loading
    }
  };

  const handleView = (item) => {
    setViewedItem(item);
  };

  const handleClose = () => {
    setViewedItem(null);
  };

  const filteredPayments = payments.filter((payment) =>
    payment.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">DATA PEMBAYARAN</h1>

      <div className="rounded-lg">
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Cari nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition-all duration-200 ease-in">
            <FaSearch />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="loader"></div> {/* Tambahkan spinner */}
          </div>
        ) : (<>
          <div className='overflow-x-auto bg-white shadow-lg rounded-lg'>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className='bg-indigo-500 text-white'>
                  <th className="border-b p-4">No</th>
                  <th className="border-b p-4">Nama</th>
                  <th className="border-b p-4">Email</th>
                  <th className="border-b p-4">No Telepon</th>
                  <th className="border-b p-4">Status</th>
                  <th className="border-b p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border-b px-4 py-2 text-center">{index + 1}</td>
                    <td className="border-b px-4 py-2">{item.nama}</td>
                    <td className="border-b px-4 py-2">{item.email}</td>
                    <td className="border-b px-4 py-2">{item.noTelepon}</td>
                    <td className="border-b px-4 py-2">{item.status}</td>
                    <td className="border-b px-4 py-2 text-center">
                      <div className="flex space-x-3 justify-center">
                        {item.status === "Diproses" && (
                          <>
                            <button
                              className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 ${actionLoading === item.id ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                              onClick={() => handleApprove(item.id)}
                              disabled={actionLoading === item.id}
                            >
                              {actionLoading === item.id ? "Loading..." : "Setujui"}
                            </button>
                            <button
                              className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 ${actionLoading === item.id ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                              onClick={() => handleReject(item.id)}
                              disabled={actionLoading === item.id}
                            >
                              {actionLoading === item.id ? "Loading..." : "Tolak"}
                            </button>
                          </>
                        )}
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                          onClick={() => handleView(item)}
                        >
                          Lihat
                        </button>
                      </div>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
        )}
      </div>

      {viewedItem && (
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
              <p>
                <strong>Bukti Pembayaran:</strong>
                {viewedItem.buktiPembayaran ? (
                  <img
                    src={`/bukti/${viewedItem.buktiPembayaran}`}
                    alt="Bukti Pembayaran"
                    className="w-32 h-32 object-cover"
                  />
                ) : (
                  <span>Belum ada bukti pembayaran</span>
                )}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(viewedItem.total)}
              </p>

              <div className='flex items-center justify-end'>

                {viewedItem.status === "Diproses" && (
                  <>
                    <button
                      className={`bg-green-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-green-600 transition-all duration-200 ${actionLoading === viewedItem.id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      onClick={() => handleApprove(viewedItem.id)}
                      disabled={actionLoading === viewedItem.id}
                    >
                      {actionLoading === viewedItem.id ? "Loading..." : "Setujui"}
                    </button>
                    <button
                      className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 ${actionLoading === viewedItem.id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      onClick={() => handleReject(viewedItem.id)}
                      disabled={actionLoading === viewedItem.id}
                    >
                      {actionLoading === viewedItem.id ? "Loading..." : "Tolak"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PembayaranAdmin;
