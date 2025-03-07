import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const createRating = async (formData) => {

    try {
        const response = await axios.post(`${apiUrl}/rating/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        if (response.data && response.data.message) {
            // Map response data to Membership instances
            return response.data;
        } else {
            throw new Error("No class data found in the response.");
        }
    } catch (error) {
        console.error("Failed to fetch rating info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const ratingService = {
    createRating
};

export default ratingService;