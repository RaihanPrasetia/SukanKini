import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import classService from '../../../service/User/classService';  // Import the classService

const DetailKelas = () => {
  const { id } = useParams();  // Get class ID from URL parameters
  const navigate = useNavigate();

  // State to store class details
  const [classInfo, setClassInfo] = useState(null);
  const [relatedClasses, setRelatedClasses] = useState([]);  // State for related classes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch class details using classService
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const fetchedClass = await classService.getClassById(id);
        console.log('Fetched Class Details:', fetchedClass);  // Log the fetched class details to inspect the data
        setClassInfo(fetchedClass.class);
        setRelatedClasses(fetchedClass.relatedClasses);  // Directly set related classes
      } catch (error) {
        setError(error.message || "Failed to fetch class details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);  // Re-run when class ID changes

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if something goes wrong
  }

  // Log classInfo and relatedClasses to ensure data is correctly fetched
  console.log('Class Info:', classInfo);
  console.log('Related Class Info:', relatedClasses);

  return (
    <>
      <div className="flex flex-col pb-6 bg-gray-200">
        {/* Header Section */}
        <div
          className="relative w-full h-64 md:h-120 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/kelas/${classInfo?.image_path}')` }}  // Image path updated
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">{classInfo?.name}</h1>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/kelas')}  // Navigate to '/kelas' route
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
              src={`/images/kelas/${classInfo?.image_path}`}  // Corrected image path for the class
              alt={classInfo?.name}
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-green-500">{classInfo?.name}</h2>
            <p className="text-gray-700 mt-4 text-lg font-bold">{classInfo?.category?.name}</p>  {/* Category name */}
            <div className="mt-6">
              <p className="text-gray-600">
                <strong>Location:</strong> {classInfo?.address} {/* Owner's address */}
              </p>
              <p className="text-gray-600">
                <strong>Hours: </strong>
                {classInfo?.schedules?.map(schedule => `${schedule.hari} ${schedule.jam}`).join(', ')} {/* Schedule */}
              </p>
              <p className="text-gray-600 font-semibold">
                <strong>Price: </strong>
                {classInfo?.price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(classInfo?.price) : 'Harga tidak tersedia'}
              </p>

              <p className="text-gray-600">
                <strong>Trainer: </strong>
                <span className='text-yellow-600 font-semibold'>{classInfo?.trainer?.name}</span> {/* Trainer name */}
              </p>
            </div>
            <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition">
              Daftar Kelas
            </button>
          </div>
        </div>

        {/* Related Classes */}
        {relatedClasses.length > 0 && (  // Use relatedClasses state for rendering
          <div className="px-6 md:px-20 py-8">
            <h3 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">Rekomendasi Kelas Lain</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Render related classes */}
              {relatedClasses.map((relatedClass, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={`/images/kelas/${relatedClass?.image_path}`}  // Image path for related class
                    alt={relatedClass?.name}
                    className="w-full h-64 md:w-full md:h-80 object-cover rounded-lg shadow-lg"
                  />
                  <div className="p-4">
                    <h4 className="text-2xl text-center font-semibold ">{relatedClass?.name}</h4>
                    <p className=" text-yellow-600 text-center text-xl font-semibold mb-2">
                      {relatedClass?.owner?.name}</p>
                    <p className=" text-gray-600  text-sm ">
                      <strong>Pelatih : </strong>
                      {relatedClass?.trainer?.name}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Harga : </strong>
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(relatedClass?.price)} {/* Price */}
                    </p>
                  </div>
                  <div className='p-4 justify-end flex items-center gap-2'>
                    <Link to={`/kelas/${relatedClass?.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow hover:bg-blue-600 transition-all">
                        Lihat Kelas
                      </button>
                    </Link>
                    <button
                      className="bg-green-500 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow hover:bg-green-600 transition-all"
                    >
                      Daftar Kelas
                    </button>
                  </div>
                </div>

              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
                Lihat Kelas Lain
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailKelas;
