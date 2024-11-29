import axios from "axios";
import Video from "../../constructors/videoConstructor"; // Assuming this is a constructor function for Payment

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getUserVideo = async () => {
    try {
        const response = await axios.get(`${apiUrl}/videos`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.videos) {
            return response.data.videos.map(video => new Video(video));
        } else {
            throw new Error("No payment data found.");
        }
    } catch (error) {
        console.error("Error fetching payments:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch payments");
    }
};

const userLikeVideo = async (videoId) => {

    try {
        const formData = new FormData();
        formData.append('video_id', videoId);
        const response = await axios.post(`${apiUrl}/likes`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data; // Kembalikan data dari server
    } catch (error) {
        console.error("Error liking video:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to like video");
    }
};

const userCommentVideo = async (formData) => {

    try {

        const response = await axios.post(`${apiUrl}/comments`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data; // Kembalikan data dari server
    } catch (error) {
        console.error("Error liking video:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to like video");
    }
};



const userVideoService = {
    getUserVideo,
    userLikeVideo,
    userCommentVideo,

};

export default userVideoService;
