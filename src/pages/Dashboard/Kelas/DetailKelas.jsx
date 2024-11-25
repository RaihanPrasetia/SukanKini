import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import classService from '../../../service/User/classService';
import DaftarKelasPopup from './DaftarKelas';
import { FaUser, FaMoneyBillWaveAlt } from 'react-icons/fa';

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
        console.log("Relet class :", fetchedClass.relatedClasses)
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
          <h2 className="text-3xl font-bold text-red-500">{error}</h2>
          <button
            onClick={() => navigate('/kelas')}
            className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow hover:bg-yellow-600 transition"
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
      <div className="flex flex-col pb-6 bg-gray-100">
        {/* Header Section */}
        <div
          className="relative w-full h-64 md:h-120 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/kelas/${classInfo?.image_path}')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">{classInfo?.name}</h1>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/kelas')}
            className="absolute top-1/3 left-4 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-75 transition"
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
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-green-500">{classInfo?.owner?.name}</h2>
            <h2 className="text-xl md:text-2xl font-bold text-gray-500">{classInfo?.name} - {classInfo?.category?.name}</h2>

            <div className="mt-2">
              <p className="text-gray-600"><strong>Location:</strong> {classInfo?.address}</p>
              <p className="text-gray-600"><strong>Hours: </strong>{classInfo?.schedules?.map(schedule => `${schedule.hari} ${schedule.jam}`).join(', ')}</p>

              <p className="text-gray-600"><strong>Trainer: </strong><span className="text-yellow-600 font-semibold">{classInfo?.trainer?.name}</span></p>

              <p className="text-green-600 font-bold text-lg"><strong className="text-gray-600">Price: </strong>{classInfo?.price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(classInfo?.price) : 'Harga tidak tersedia'}</p>

              <strong className="text-lg text-gray-600">Benefit:</strong>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {classInfo?.benefits?.map((benefit, index) => (
                  <div key={benefit.id} className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold text-green-600 text-lg">{index + 1}. {benefit.name}</h3>
                    <p className="text-gray-800">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => openPopup(classInfo)}
              className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">
              Daftar Kelas
            </button>
          </div>
        </div>

        {/* Related Classes */}
        {relatedClasses.length > 0 && (
          <div className="px-6 md:px-20 py-8">
            <h3 className="text-3xl md:text-4xl font-bold text-green-600 mb-8 text-center">
              Rekomendasi Kelas Lain
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {relatedClasses.map((relatedClass, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-xl overflow-hidden "
                >
                  <img
                    src={`/images/kelas/${relatedClass?.image_path}`}
                    alt={relatedClass?.name}
                    className="w-full h-64 md:h-28 object-cover "
                  />
                  <div className="p-6">
                    {/* Class Name */}
                    <h4 className="text-2xl font-semibold text-center text-gray-800 ">
                      {relatedClass?.name}
                    </h4>

                    {/* Class Owner */}
                    <p className="text-yellow-600 text-center text-lg font-semibold ">
                      {relatedClass?.owner?.name}
                    </p>

                    {/* Trainer */}
                    <p className="text-gray-600 text-sm flex items-center">
                      <FaUser className="w-4 h-4 mr-2 text-blue-500" /> {/* Trainer icon */}
                      <span className="font-medium">Pelatih: </span> {relatedClass?.trainer?.name}
                    </p>

                    {/* Price */}
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaMoneyBillWaveAlt className="w-4 h-4 mr-2 text-green-500" /> {/* Price icon */}
                      <span className="font-medium">Harga:</span>{" "}
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                        relatedClass?.price
                      )}
                    </p>

                    {/* Benefits Section */}
                    <h5 className="font-semibold text-gray-800 text-lg">Manfaat Kelas:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {relatedClass?.benefits?.map((benefit, index) => (
                        <div key={benefit.id} className="p-4 bg-gray-50 rounded-lg shadow-md">
                          <h6 className="font-semibold text-green-600 text-base">{index + 1}. {benefit.name}</h6>
                          <p className="text-gray-700 text-sm">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 flex justify-end gap-4">
                    <Link to={`/kelas/${relatedClass?.id}`} onClick={handleMenuClick}>
                      <button className="bg-blue-500 text-white px-5 py-3 text-sm font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
                        Lihat Kelas
                      </button>
                    </Link>
                    <button
                      onClick={() => openPopup(relatedClass)}
                      className="bg-green-500 text-white px-5 py-3 text-sm font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors"
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
            className="bg-gray-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow hover:bg-yellow-600 transition"
          >
            Kembali
          </button>
        </div>
      </div>

      {isPopupOpen && <DaftarKelasPopup onClose={closePopup} classInfo={selectedClass} />}
    </>
  );
};

export default DetailKelas;
