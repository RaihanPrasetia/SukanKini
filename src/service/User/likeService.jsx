import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const userLikeVideo = async (formData) => {
    try {
        const response = await axios.post(`${apiUrl}/likes`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        return response.data; // Kembalikan data dari server
    } catch (error) {
        console.error("Error liking video:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to like video");
    }
};



const adminVideoService = {
    userLikeVideo,

};

export default adminVideoService;
