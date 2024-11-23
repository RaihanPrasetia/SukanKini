import React, { useState, useEffect } from 'react';
import categoryService from '../../service/categoryService';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';

const Category = () => {
const [categories, setCategories] = useState([]); // State to store the fetched trainers data
const [loading, setLoading] = useState(true); // State to handle loading state
const [error, setError] = useState(null); // State to handle errors
const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
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
setLoading(false); // Set loading to false after data is fetched
}
};

fetchCategories(); // Call the function to fetch trainers
}, []); // Empty dependency array to run the effect once when component mounts

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
setIsModalOpen(false); // Close modal after success
setCategoryData({ name: '' }); // Reset form
// Optionally, you could refetch trainers after adding a new one
const updatedCategory = await categoryService.getCategory(); // Re-fetch trainers
setCategories(updatedCategory);
} catch (error) {
Swal.fire('Gagal menambahkan Kategori', error.message, 'error');
}
};



if (loading) {
return <div>Loading trainers...</div>; // Show loading state
}

if (error) {
return <div>{error}</div>; // Show error message if fetching fails
}

return (
<div className="w-full bg-white p-6 lg:px-16 rounded-lg py-24 lg:pt-32 shadow-lg min-h-[80vh]">
    <div className="flex flex-col lg:flex-row justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 lg:mb-0 tracking-tight">
            Category List
        </h2>
        <button
    className="flex items-center bg-green-600 text-white py-3 px-7 rounded-full hover:bg-green-700 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    onClick={() => setIsModalOpen(true)} // Open modal when button is clicked
>
    <FaPlus className="mr-2" />
    Tambah Category
</button>

    </div>

    {/* Modal for Adding Category */}
    {isModalOpen && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4">Tambah Category</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" value={categoryData.name} onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-300 ease-in-out backdrop-blur-md"
                        required placeholder="Enter category name" />
                </div>

                <div className="flex justify-between">
                    <button type="button" onClick={()=> setIsModalOpen(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all
                        duration-300"
                        >
                        Cancel
                    </button>
                    <button type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300">
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    </div>

    )}



    <div className="space-y-4">
        <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <span className="font-semibold">Nomor</span>
            <span className="font-semibold">Name</span>
        </div>
        {categories.length === 0 ? (
        <div className="text-center py-5 text-xl font-semibold text-gray-500">
            Belum ada data category
        </div>
        ) : (
        categories.map((category, index) => (
        <div key={index}
            className="flex justify-between items-center px-4 py-2 border-b border-gray-300 hover:bg-gray-100">
            <span className="font-semibold">{index + 1}</span>
            <span className="font-semibold uppercase">{category.name}</span>
        </div>
        ))
        )}
    </div>

</div>
);
};

export default Category;