import axios from 'axios';
import Notification from '../constructors/notifConstructor';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getNotifications = async () => {
    try {
        const response = await axios.get(`${apiUrl}/notifications`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        if (response.data && response.data.notifications) {
            return response.data.notifications.map(notification => new Notification(notification)); // Mapping each payment response to the Payment model
        } else {
            throw new Error("No Trainer data found.");
        }
    } catch (error) {
        console.error("Failed to fetch Trainer info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const updateNotifications = async (notifId) => {
    try {

        const response = await axios.put(`${apiUrl}/notifications/${notifId}/read`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        if (response.data && response.data.message && response.data.notification) {
            return new Notification(response.data.notification); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Failed to fetch Trainer info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const notifService = {
    getNotifications,
    updateNotifications

};

export default notifService;