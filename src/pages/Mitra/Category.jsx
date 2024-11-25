import React, { useState, useEffect } from 'react';
import categoryService from '../../service/categoryService';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryData, setCategoryData] = useState({
        name: '',
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await categoryService.getCategory();
                setCategories(fetchedCategories);
            } catch (error) {
                setError(error.message || 'Failed to fetch category data');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name } = categoryData;

        if (!name) {
            Swal.fire('Semua Data wajib Diisi');
            return;
        }

        try {
            await categoryService.createCategory(name);
            Swal.fire({
                title: 'Kategori Ditambahkan!',
                text: 'Kategori baru Anda berhasil ditambahkan.',
                icon: 'success', // Ikon centang hijau
                confirmButtonText: 'Hebat!',
                confirmButtonColor: '#3085d6',
                background: '#f0f8ff', // Latar belakang yang lebih ringan dan ramah
                showClass: {
                    popup: 'swal2-animate-success-fade', // Animasi popup muncul dengan efek fade
                },
                timer: 1500, // Popup akan otomatis ditutup setelah 1.5 detik
                position: 'top-center', // Posisi popup di bagian atas tengah
            });
            setIsModalOpen(false);
            setCategoryData({ name: '' });
            const updatedCategory = await categoryService.getCategory();
            setCategories(updatedCategory);
        } catch (error) {
            Swal.fire({
                title: 'Gagal Menambahkan Kategori',
                text: error.message,
                icon: 'error', // Ikon merah untuk error
                confirmButtonText: 'Coba Lagi',
                confirmButtonColor: '#d33',
                background: '#ffe5e5', // Latar belakang merah muda untuk kesan error
                showClass: {
                    popup: 'swal2-animate-error-fade', // Animasi popup error dengan efek fade
                },
                timer: 2500, // Popup akan otomatis ditutup setelah 2.5 detik
                position: 'top-center', // Posisi popup di bagian atas tengah
            });
        }

    };

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">{error}</div>;
    }

    return (
        <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-200 p-6 lg:px-16 rounded-lg py-24 lg:pt-32 shadow-xl min-h-[80vh]">
            <div className="flex flex-col lg:flex-row justify-between mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Category List</h2>
                <button
                    className="flex items-center bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    <FaPlus className="mr-2" />
                    Tambah Category
                </button>
            </div>

            {/* Modal for Adding Category */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 transition-all duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all scale-95 hover:scale-100">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Category</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Category Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                                    required
                                />
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Table */}
            <div className="overflow-x-auto mt-8">
                <table className="min-w-full text-sm text-center text-gray-700 shadow-md bg-white rounded-lg border border-gray-300">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-sm text-white">
                        <tr>
                            <th className="px-6 py-3 font-semibold border-r border-white w-12">No</th> {/* Kolom No lebih sempit */}
                            <th className="px-6 py-3 font-semibold  border-white">Category Name</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="text-center py-5 text-xl font-semibold text-gray-500">
                                    Belum ada data category
                                </td>
                            </tr>
                        ) : (
                            categories.map((category, index) => (
                                <tr
                                    key={category.id}
                                    className={`hover:bg-gray-100 transition duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t border-gray-200`}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-700 border-r border-gray-200">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800 capitalize border-r border-gray-200">{category.name}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>




        </div>
    );
};

export default Category;
