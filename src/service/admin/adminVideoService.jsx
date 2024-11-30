import axios from "axios";
import Video from "../../constructors/videoConstructor"; // Assuming this is a constructor function for Payment

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getAdminVideo = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/videos`, {
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

const createVideo = async (formData) => {
    try {
        // Call the backend API to create the video
        const response = await axios.post(`${apiUrl}/admin/videos`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,  // Ensure the API key is set correctly
                "Content-Type": "multipart/form-data",  // Important to set this for file uploads
            },
        });

        // Log response for debugging (optional)
        console.log("Video created successfully:", response.data);

        // Return the newly created video data
        return response.data;
    } catch (error) {
        // Log error for debugging (optional)
        console.error("Error creating video:", error.message || error);

        // Extract error message from response if available
        const errorMessage = error.response?.data?.message || error.message || "Failed to create video";

        // Handle errors and throw a more detailed message
        throw new Error(errorMessage);
    }
};


const updateVideo = async (videoId, formData) => {
    try {
        const response = await axios.put(`${apiUrl}/admin/videos/${videoId}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                api_key: apiKey,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating video:', error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to update video');
    }
};

const deleteVideo = async (videoId) => {
    try {
        const response = await axios.delete(`${apiUrl}/admin/videos/${videoId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        return response.data; // Mengembalikan pesan keberhasilan
    } catch (error) {
        console.error("Error deleting video:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to delete video");
    }
};


const adminVideoService = {
    getAdminVideo,
    createVideo,
    updateVideo,
    deleteVideo,
};

export default adminVideoService;
