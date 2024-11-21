import React, { useState, useEffect } from 'react';
import categoryService from '../../service/categoryService';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';

const Category = () => {
    const [categories, setCategories] = useState([]);  // State to store the fetched trainers data
    const [loading, setLoading] = useState(true);  // State to handle loading state
    const [error, setError] = useState(null);  // State to handle errors
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
    const [categoryData, setCategoryData] = useState({
        name: '',
    });
    // To store the category being edited

    // Fetch trainers data from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await categoryService.getCategory();
                setCategories(fetchedCategories);
            } catch (error) {
                setError(error.message || 'Failed to fetch category data');
            } finally {
                setLoading(false);  // Set loading to false after data is fetched
            }
        };

        fetchCategories();  // Call the function to fetch trainers
    }, []);  // Empty dependency array to run the effect once when component mounts

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
            Swal.fire('Category added successfully');
            setIsModalOpen(false);  // Close modal after success
            setCategoryData({ name: '' });  // Reset form
            // Optionally, you could refetch trainers after adding a new one
            const updatedCategory = await categoryService.getCategory(); // Re-fetch trainers
            setCategories(updatedCategory);
        } catch (error) {
            Swal.fire('Gagal menambahkan Kategori', error.message, 'error');
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
                <h2 className="text-3xl font-semibold mb-4 lg:mb-0">Category List</h2>
                <button
                    className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    onClick={() => setIsModalOpen(true)}  // Open modal when button is clicked
                >
                    <FaPlus className="mr-2" />
                    Tambah Category
                </button>
            </div>

            {/* Modal for Adding Category */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-4">Tambah Category</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            <table className="table-auto w-1/2 text-sm text-left text-gray-500 shadow-lg bg-white">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="border px-4 py-2">Nomor</th>
                        <th className="border px-4 py-2">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-5 text-xl font-semibold text-gray-500">
                                Belum ada data category
                            </td>
                        </tr>
                    ) : (
                        categories.map((category, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 font-semibold">{index + 1}</td>
                                <td className="border px-4 py-2 font-semibold uppercase">{category.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Category;
