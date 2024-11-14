import axios from 'axios';
import User from '../models/UserModel';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${apiUrl}/user/profil`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'api_key': apiKey,
            },
        });

        console.log("Response Data:", response.data);
        const userData = response.data;
        const user = new User(userData); // Menggunakan model User untuk struktur data

        return user;
    } catch (error) {
        console.error("Failed to fetch user profile:", error.response || error.message);
        throw error;
    }
};

