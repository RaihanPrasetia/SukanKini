import axios from 'axios';
import User from '../constructors/UserModel';

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


        const userData = response.data.user;

        const user = new User(userData);

        return user;
    } catch (error) {
        console.error("Failed to fetch user profile:", error.response || error.message);
        throw error;
    }
};

export const editUserProfile = async (token, updatedData) => {
    try {
        const { id, ...userData } = updatedData;

        const response = await axios.put(`${apiUrl}/user/update/${id}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'api_key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        // Log the entire response object for more details

        // Check if the response has the expected user data
        if (response.data && response.data.user) {
            return response.data.user;
        } else {
            console.error("Unexpected response format", response);
            throw new Error("Unexpected response format from server");
        }
    } catch (error) {
        console.error("Failed to update user profile:", error.response || error.message);
        throw error;
    }
};




