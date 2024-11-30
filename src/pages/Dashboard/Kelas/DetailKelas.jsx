import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import classService from "../../../service/User/classService";
import DaftarKelasPopup from "./DaftarKelas";
import { FaUser, FaMoneyBillWaveAlt } from "react-icons/fa";

const DetailKelas = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classInfo, setClassInfo] = useState(null);
  const [relatedClasses, setRelatedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const fetchedClass = await classService.getClassById(id);
        if (!fetchedClass.class) {
          throw new Error("Kelas tidak tersedia");
        }
        setClassInfo(fetchedClass.class);
        setRelatedClasses(fetchedClass.relatedClasses);
        console.log("Relet class :", fetchedClass.relatedClasses);
      } catch (error) {
        setError(error.message || "Failed to fetch class details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            Kami tidak dapat menemukan halaman yang Anda cari. Mungkin alamatnya
            salah atau halaman sudah dihapus.
          </p>

          {/* Button to go back */}
          <button
            onClick={() => navigate("/kelas")}
            className="mt-4 bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-red-500 transition duration-300"
          >
            Kembali ke Daftar Kelas
          </button>
        </div>
      </div>
    );
  }

  const openPopup = (classInfo) => {
    setSelectedClass(classInfo);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedClass(null);
  };

  const goToKelas = () => {
    navigate(-1);
  };

  const handleMenuClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex flex-col pb-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
  {/* Header Section */}
  <div
    className="relative w-full h-64 md:h-120 bg-cover bg-center rounded-xl shadow-lg"
    style={{
      backgroundImage: `url('/images/kelas/${classInfo?.image_path}')`,
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center rounded-xl">
      <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg px-4 text-center">
        {classInfo?.name}
      </h1>
    </div>

    {/* Back Button */}
    <button
      onClick={() => navigate("/kelas")}
      className="absolute top-8 left-4 text-white bg-black bg-opacity-60 p-3 rounded-full shadow-xl hover:bg-opacity-80 transition-all"
    >
      <AiOutlineLeft className="text-2xl" />
    </button>
  </div>

  {/* Main Content */}
  <div className="flex flex-col md:flex-row px-6 md:px-20 py-8 space-y-6 md:space-y-0 md:space-x-8">
    {/* Image Section */}
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src={`/images/kelas/${classInfo?.image_path}`}
        alt={classInfo?.name}
        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-xl shadow-2xl transform transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </div>

    {/* Details Section */}
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl md:text-3xl font-bold text-green-600 capitalize">
        {classInfo?.owner?.name}
      </h2>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mt-1">
        {classInfo?.name} - {classInfo?.category?.name}
      </h2>

      <div className="mt-4 text-gray-700">
        <p>
          <strong className="text-gray-900">Location:</strong> {classInfo?.address}
        </p>
        <p>
          <strong className="text-gray-900">Hours: </strong>
          {classInfo?.schedules
            ?.map((schedule) => `${schedule.hari} ${schedule.jam}`)
            .join(", ")}
        </p>

        <p>
          <strong className="text-gray-900">Trainer: </strong>
          <span className="text-yellow-600 font-semibold">
            {classInfo?.trainer?.name}
          </span>
        </p>

        <p className="text-green-600 font-bold text-lg mt-2">
          <strong className="text-gray-900">Price: </strong>
          {classInfo?.price
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(classInfo?.price)
            : "Harga tidak tersedia"}
        </p>

        <strong className="text-lg text-gray-900 mt-4">Benefit:</strong>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {classInfo?.benefits?.map((benefit, index) => (
            <div
              key={benefit.id}
              className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105"
            >
              <h3 className="font-semibold text-green-600 text-lg">
                {index + 1}. {benefit.name}
              </h3>
              <p className="text-gray-800">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => openPopup(classInfo)}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all"
      >
        Daftar Kelas
      </button>
    </div>
  </div>

  {/* Related Classes */}
  {relatedClasses.length > 0 && (
    <div className="px-6 md:px-20 py-8">
      <h3 className="text-3xl md:text-4xl font-semibold text-green-600 mb-10 text-center">
        Rekomendasi Kelas Lain
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {relatedClasses.map((relatedClass, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <img
              src={`/images/kelas/${relatedClass?.image_path}`}
              alt={relatedClass?.name}
              className="w-full h-64 md:h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out"
            />
            <div className="p-6">
              <h4 className="text-2xl font-semibold text-center text-gray-800 hover:text-green-600 transition-colors duration-300">
                {relatedClass?.name}
              </h4>
              <p className="text-yellow-600 text-center text-lg font-semibold mt-1">
                {relatedClass?.owner?.name}
              </p>

              <div className="mt-3 space-y-2">
                <p className="text-gray-600 text-sm flex items-center justify-center">
                  <FaUser className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-medium">Pelatih:</span>{" "}
                  {relatedClass?.trainer?.name}
                </p>
                <p className="text-gray-600 text-sm flex items-center justify-center">
                  <FaMoneyBillWaveAlt className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium">Harga:</span>{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(relatedClass?.price)}
                </p>
              </div>

              <h5 className="font-semibold text-gray-800 text-lg mt-4">
                Manfaat Kelas:
              </h5>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {relatedClass?.benefits?.map((benefit, index) => (
                  <div
                    key={benefit.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all"
                  >
                    <h6 className="font-semibold text-green-600 text-base">
                      {index + 1}. {benefit.name}
                    </h6>
                    <p className="text-gray-700 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 flex justify-between items-center">
              <Link
                to={`/kelas/${relatedClass?.id}`}
                onClick={handleMenuClick}
              >
                <button className="bg-blue-500 text-white px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
                  Lihat Kelas
                </button>
              </Link>
              <button
                onClick={() => openPopup(relatedClass)}
                className="bg-green-500 text-white px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
              >
                Daftar Kelas
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  <div className="flex justify-center mt-6">
    <button
      onClick={goToKelas}
      className="bg-gray-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow hover:bg-yellow-600 transition-all"
    >
      Kembali
    </button>
  </div>
</div>


      {isPopupOpen && (
        <DaftarKelasPopup onClose={closePopup} classInfo={selectedClass} />
      )}
    </>
  );
};

export default DetailKelas;
