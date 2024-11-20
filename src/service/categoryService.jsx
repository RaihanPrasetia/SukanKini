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


const categoryService = {
    getCategory,
};

export default categoryService;
