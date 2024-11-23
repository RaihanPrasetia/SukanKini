import axios from 'axios';
import Category from '../constructors/categoryConstructor';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getCategory = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/categories`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        if (response.data && response.data.categories) {
            return response.data.categories.map(category => new Category(category)); // Mapping each payment response to the Payment model
        } else {
            throw new Error("No Category data found.");
        }
    } catch (error) {
        console.error("Failed to fetch bank info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const createCategory = async (name) => {
    try {
        const formData = new FormData();
        formData.append("name", name);

        const response = await axios.post(`${apiUrl}/mitra/categories/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        if (response.data && response.data.category) {
            return new Category(response.data.category); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Failed to fetch Category info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
}
const updateCategory = async (name, categoryId) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        const response = await axios.put(`${apiUrl}/mitra/categories/update/${categoryId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        if (response.data && response.data.category) {
            return new Category(response.data.category); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Failed to fetch Category info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
}

const deleteCategory = async (categoryId) => {
    try {
        await axios.delete(`${apiUrl}/mitra/categories/delete/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });


    } catch (error) {
        console.error("Failed to fetch class info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch class info");
    }
};



const categoryService = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};

export default categoryService;
