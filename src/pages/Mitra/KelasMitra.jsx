import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import classService from '../../service/classService'; // Import service
import trainerService from '../../service/trainerService'; // Import service
import categoryService from '../../service/categoryService'; // Import service

const KelasMitra = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        trainer: '',
        schedules: [],
        address: '',
        price: '',
        image_path: null,
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);

    const [newSchedule, setNewSchedule] = useState({ hari: '', jam: '' });
    const [classes, setClasses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleEdit = async (kelas) => {
        setEditingClass(kelas);
        try {
            const [categoryData, trainerData] = await Promise.all([
                categoryService.getCategory(),
                trainerService.getTrainer(),
            ]);
            setCategories(categoryData);
            setTrainers(trainerData);

            setFormData({
                name: kelas.name,
                category: kelas.category.id,
                trainer: kelas.trainer.id,
                address: kelas.address,
                schedules: kelas.schedules || [],
                price: kelas.price,
                image_path: kelas.image_path || '',
            });
            setIsEditModalOpen(true);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Gagal mengambil data kategori atau pelatih.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };


    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const classId = editingClass?.id;


            const formDataToSubmit = {
                name: formData.name,
                category_id: parseInt(formData.category),
                alamat: formData.address,
                schedules: formData.schedules,
                trainer_id: parseInt(formData.trainer),
                image_path: formData.image_path,
                price: formData.price
            };


            await classService.updateClass(classId,
                formDataToSubmit.name,
                formDataToSubmit.category_id,
                formDataToSubmit.alamat,
                formDataToSubmit.schedules,
                formDataToSubmit.trainer_id,
                formDataToSubmit.image_path,
                formDataToSubmit.price
            );

            Swal.fire({
                title: "Berhasil",
                text: "Kelas berhasil diperbarui!",
                icon: "success",
                confirmButtonText: "OK",
            });

            setIsEditModalOpen(false);
            setEditingClass(null); // Clear the class data

            // Refresh class list
            const newClass = await classService.getClasses();
            setClasses(newClass);
        } catch (error) {
            console.error("Error:", error); // Log full error
            Swal.fire({
                title: "Error",
                text: error.message || "Gagal memperbarui kelas.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };






    // Fetch classes on component mount
    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                const classData = await classService.getClasses();
                setClasses(classData); // Update state with new class data
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'Gagal mengambil data kelas.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error("Error fetching classes:", error); // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    const handleViewDetails = (kelasId) => {
        navigate(`/mitra/kelas/${kelasId}`);
    };

    // Fetch categories and trainers when modal is opened
    const handleModalOpen = async () => {
        try {
            const [categoryData, trainerData] = await Promise.all([
                categoryService.getCategory(),
                trainerService.getTrainer(),
            ]);
            setCategories(categoryData);
            setTrainers(trainerData);
            setIsModalOpen(true);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Gagal mengambil data kategori atau pelatih.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleModalClose = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Prepare form data
            const formDataToSubmit = {
                name: formData.name,
                category_id: formData.category,
                alamat: formData.address,
                schedules: formData.schedules,
                trainer_id: formData.trainer,
                image_path: formData.image_path,
                price: formData.price
            };

            // Call API to create class
            await classService.createClass(formDataToSubmit);

            Swal.fire({
                title: "Berhasil",
                text: "Kelas berhasil dibuat!",
                icon: "success",
                confirmButtonText: "OK",
            });

            // Close the modal and reset form
            setIsModalOpen(false);
            setFormData({
                name: '',
                category: '',
                trainer: '',
                schedule: '',
                address: '',
            });

        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (kelasId) => {
        try {
            const result = await Swal.fire({
                title: 'Apakah Anda yakin?',
                text: 'Kelas ini akan dihapus!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus!',
                cancelButtonText: 'Batal',
            });

            if (result.isConfirmed) {
                setLoading(true);
                await classService.deleteClassById(kelasId);
                Swal.fire('Dihapus!', 'Kelas telah dihapus.', 'success');
            }
            // Refresh class list
            const newClass = await classService.getClasses();
            setClasses(newClass);

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full bg-white p-6 lg:px-16 rounded-lg py-24 lg:pt-32 shadow-lg min-h-[80vh]">
            <div className="flex flex-col lg:flex-row justify-between mb-5">
                <h2 className="text-3xl font-semibold mb-4 lg:mb-0">Daftar Kelas</h2>
                <button
                    className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    onClick={handleModalOpen}
                >
                    <FaPlus className="mr-2" />
                    Buat Kelas
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Buat Kelas</h3>
                        <form onSubmit={handleFormSubmit}>

                            <div className='flex justify-between items-center mb-4 gap-2'>
                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2">Nama Kelas</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2">Pelatih</label>
                                    <select
                                        name="trainer"
                                        value={formData.trainer}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="">Pilih Pelatih</option>
                                        {trainers.map((trainer) => (
                                            <option key={trainer.id} value={trainer.id}>
                                                {trainer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Jadwal</label>
                                <div className="flex items-center space-x-4 mb-2">
                                    {/* Pilihan Hari */}
                                    <select
                                        name="hari"
                                        value={newSchedule.hari}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, hari: e.target.value })}
                                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Pilih Hari</option>
                                        <option value="Senin">Senin</option>
                                        <option value="Selasa">Selasa</option>
                                        <option value="Rabu">Rabu</option>
                                        <option value="Kamis">Kamis</option>
                                        <option value="Jumat">Jumat</option>
                                        <option value="Sabtu">Sabtu</option>
                                        <option value="Minggu">Minggu</option>
                                    </select>

                                    {/* Input Waktu */}
                                    <input
                                        type="time"
                                        name="jam"
                                        value={newSchedule.jam}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, jam: e.target.value })}
                                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                                    />

                                    {/* Tombol Tambah Jadwal */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newSchedule.hari && newSchedule.jam) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    schedules: [...prev.schedules, newSchedule],
                                                }));
                                                setNewSchedule({ hari: '', jam: '' }); // Reset input
                                            } else {
                                                alert("Mohon isi hari dan jam sebelum menambah jadwal.");
                                            }
                                        }}
                                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Tambah
                                    </button>
                                </div>

                                {/* Daftar Jadwal */}
                                <ul className="mt-2 space-y-1">
                                    {formData.schedules.map((schedule, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span>{`${schedule.hari} (${schedule.jam})`}</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        schedules: prev.schedules.filter((_, i) => i !== index),
                                                    }))
                                                }
                                                className="text-red-500 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='flex justify-between items-center gap-2 mb-4'>
                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2">Alamat</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2">Harga</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className='w-full'>
                                    <label className="block text-sm font-medium mb-2">Gambar</label>
                                    <input
                                        type="file"
                                        name="image_path"
                                        onChange={(e) => setFormData({ ...formData, image_path: e.target.files[0] })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={handleModalClose}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && editingClass && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Edit Kelas</h3>
                        <form onSubmit={handleEditFormSubmit}>
                            {/* Nama Kelas */}


                            {/* Kategori & Pelatih */}
                            <div className="flex gap-4 mb-2">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kelas</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || editingClass.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                {/* Kategori */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category || editingClass.category.id}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Pelatih */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pelatih</label>
                                    <select
                                        name="trainer"
                                        value={formData.trainer || editingClass.trainer.id}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Pelatih</option>
                                        {trainers.map((trainer) => (
                                            <option key={trainer.id} value={trainer.id}>
                                                {trainer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Jadwal */}
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Jadwal</label>
                                <div className="flex items-center gap-4 mb-4">
                                    <select
                                        name="hari"
                                        value={newSchedule.hari}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, hari: e.target.value })}
                                        className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Hari</option>
                                        <option value="Senin">Senin</option>
                                        <option value="Selasa">Selasa</option>
                                        <option value="Rabu">Rabu</option>
                                        <option value="Kamis">Kamis</option>
                                        <option value="Jumat">Jumat</option>
                                        <option value="Sabtu">Sabtu</option>
                                        <option value="Minggu">Minggu</option>
                                    </select>

                                    <input
                                        type="time"
                                        name="jam"
                                        value={newSchedule.jam}
                                        onChange={(e) => setNewSchedule({ ...newSchedule, jam: e.target.value })}
                                        className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newSchedule.hari && newSchedule.jam) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    schedules: [...prev.schedules, newSchedule],
                                                }));
                                                setNewSchedule({ hari: '', jam: '' });
                                            } else {
                                                alert("Mohon isi hari dan jam sebelum menambah jadwal.");
                                            }
                                        }}
                                        className="py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Tambah
                                    </button>
                                </div>
                                <ul className="space-y-2">
                                    {formData.schedules.map((schedule, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span>{`${schedule.hari} (${schedule.jam})`}</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        schedules: prev.schedules.filter((_, i) => i !== index),
                                                    }))
                                                }
                                                className="text-red-500 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Alamat */}
                            <div className='flex justify-between items-center gap-4 mb-2'>

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address || editingClass.address}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price || editingClass.price}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Kelas</label>
                                    <input
                                        type="file"
                                        name="image_path"
                                        onChange={(e) => {
                                            setFormData({ ...formData, image_path: e.target.files[0] });
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {/* Display image preview */}

                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Perbarui
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}




            <div className="overflow-x-auto mt-6">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <table className="min-w-full text-sm text-left text-gray-500 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border">Gambar</th>
                                <th className="px-4 py-2 border">Nama Kelas</th>
                                <th className="px-4 py-2 border">Kategori</th>
                                <th className="px-4 py-2 border">Hari & Jam</th>
                                <th className="px-4 py-2 border">Trainer</th>
                                <th className="px-4 py-2 border">Alamat</th>
                                <th className="px-4 py-2 border">Harga</th>
                                <th className="px-4 py-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((kelas) => (
                                <tr key={kelas.id}>
                                    <td className="px-4 py-2 border text-center">
                                        <img
                                            src={`/images/kelas/${kelas.imagePath}`}
                                            alt={kelas.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">{kelas.name}</td>
                                    <td className="px-4 py-2 border">{kelas.category.name}</td>
                                    <td className="px-4 py-2 border">
                                        {kelas.schedules
                                            .map((schedule) => `${schedule.hari} (${schedule.jam})`)
                                            .join(', ')}
                                    </td>
                                    <td className="px-4 py-2 border">{kelas.trainer.name}</td>
                                    <td className="px-4 py-2 border">{kelas.address}</td>
                                    <td className="px-4 py-2 border">{`Rp ${kelas.price.toLocaleString()}`}</td>

                                    <td className="px-4 py-2 border text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(kelas)}
                                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(kelas.id)}
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                            >
                                                Hapus
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                onClick={() => handleViewDetails(kelas.id)}
                                            >
                                                Lihat
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                )}
            </div>
        </div>
    );
};

export default KelasMitra;
