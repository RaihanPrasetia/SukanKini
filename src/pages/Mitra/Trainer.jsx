import React, { useState, useEffect } from 'react';
import trainerService from '../../service/trainerService';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);  // State to store the fetched trainers data
  const [loading, setLoading] = useState(true);  // State to handle loading state
  const [error, setError] = useState(null);  // State to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);  // State to control update modal visibility
  const [trainerData, setTrainerData] = useState({
    name: '',
    age: '',
    phone: '',
    alamat: '',
    image_path: null,
  });
  const [selectedTrainer, setSelectedTrainer] = useState(null); // To store the trainer being edited

  // Fetch trainers data from the API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const fetchedTrainers = await trainerService.getTrainer();
        setTrainers(fetchedTrainers);
      } catch (error) {
        setError(error.message || 'Failed to fetch trainer data');
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchTrainers();  // Call the function to fetch trainers
  }, []);  // Empty dependency array to run the effect once when component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setTrainerData((prevData) => ({
      ...prevData,
      image_path: e.target.files[0],  // Store the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, image_path, phone, alamat } = trainerData;

    if (!name || !age || !alamat) {
      Swal.fire('Semua Data wajib Diisi');
      return;
    }
    if (!phone) {
      Swal.fire('Nomor Telepon wajib di isi');
      return;
    }

    try {
      await trainerService.createTrainer(name, age, image_path, phone, alamat);
      Swal.fire('Trainer added successfully');
      setIsModalOpen(false);  // Close modal after success
      setTrainerData({ name: '', age: '', image_path: null, phone: '', alamat: '' });  // Reset form
      // Optionally, you could refetch trainers after adding a new one
      const updatedTrainers = await trainerService.getTrainer(); // Re-fetch trainers
      setTrainers(updatedTrainers);
    } catch (error) {
      Swal.fire('Error adding trainer', error.message, 'error');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { name, age, phone, alamat, image_path } = trainerData;

    if (!name || !age || !alamat) {
      Swal.fire('Semua Data wajib Diisi');
      return;
    }
    if (!phone) {
      Swal.fire('Nomor Telepon wajib di isi');
      return;
    }

    try {
      if (selectedTrainer) {
        await trainerService.updateTrainer(name, age, image_path, phone, alamat, selectedTrainer.id);
        Swal.fire('Trainer updated successfully');
        setIsUpdateModalOpen(false);  // Close update modal
        setTrainerData({ name: '', age: '', image_path: null, phone: '', alamat: '' });  // Reset form
        const updatedTrainers = await trainerService.getTrainer(); // Re-fetch trainers
        setTrainers(updatedTrainers);
      }
    } catch (error) {
      Swal.fire('Error updating trainer', error.message, 'error');
    }
  };

  const handleEditClick = (trainer) => {
    setSelectedTrainer(trainer);
    setTrainerData({
      name: trainer.name,
      age: trainer.age,
      phone: trainer.phone,
      alamat: trainer.alamat,
      image_path: null, // Optional: handle existing image URL if needed
    });
    setIsUpdateModalOpen(true);  // Open the update modal
  };

  const handleDeleteClick = async (trainerId) => {
    // Show a confirmation alert before deleting
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await trainerService.deleteTrainer(trainerId);  // Call the delete function
        Swal.fire('Deleted!', 'Trainer has been deleted.', 'success');
        // Remove the trainer from the state to reflect the deletion
        setTrainers((prevTrainers) => prevTrainers.filter(trainer => trainer.id !== trainerId));
      } catch (error) {
        Swal.fire('Error deleting trainer', error.message, 'error');
      }
    }
  };

  if (loading) {
    return <div>Loading trainers...</div>;  // Show loading state
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if fetching fails
  }

  return (
    <div className="w-full bg-white p-6 lg:px-16 rounded-lg py-24 lg:pt-32 shadow-lg min-h-[80vh]">
      <div className="flex flex-col lg:flex-row justify-between mb-5">
        <h2 className="text-3xl font-semibold mb-4 lg:mb-0">Trainer List</h2>
        <button
          className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}  // Open modal when button is clicked
        >
          <FaPlus className="mr-2" />
          Tambah Trainer
        </button>
      </div>

      {/* Modal for Adding Trainer */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h3 className="text-2xl font-semibold mb-6 text-center">Tambah Trainer</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={trainerData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={trainerData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="alamat" className="block text-sm font-medium">Alamat</label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={trainerData.alamat}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium">Nomor Telepon</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={trainerData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="image_path" className="block text-sm font-medium">Trainer Image</label>
                <input
                  type="file"
                  id="image_path"
                  name="image_path"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between col-span-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Add Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Updating Trainer */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h3 className="text-2xl font-semibold mb-6 text-center">Update Trainer</h3>
            <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={trainerData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={trainerData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="alamat" className="block text-sm font-medium">Alamat</label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={trainerData.alamat}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium">Nomor Telepon</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={trainerData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="image_path" className="block text-sm font-medium">Trainer Image</label>
                <input
                  type="file"
                  id="image_path"
                  name="image_path"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between col-span-2">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Update Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full text-sm text-left text-gray-500 shadow-lg bg-white">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Nomor</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Alamat</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-5 text-xl font-semibold text-gray-500">
                Belum ada data trainer
              </td>
            </tr>
          ) : (
            trainers.map((trainer, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={`/images/trainer/${trainer.imagePath}`}
                    alt={trainer.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{trainer.name}</td>
                <td className="px-4 py-2">{trainer.phone}</td>
                <td className="px-4 py-2">{trainer.alamat}</td>
                <td className="px-4 py-2">{trainer.age}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 items-center justify-center">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      onClick={() => handleEditClick(trainer)} // Open update modal with selected trainer's data
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(trainer.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Trainer;
