import axios from 'axios';
import User from '../constructors/UserModel';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${apiUrl}/user/profil`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export const editUserProfile = async (userId, image_path, name, age, weight, height, phone_number, gender, kota, alamat) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("alamat", alamat);
        formData.append("phone_number", phone_number);
        formData.append("weight", weight);
        formData.append("gender", gender);
        formData.append("height", height);
        formData.append("kota", kota);
        if (image_path) {
            formData.append("image_path", image_path); // Tambahkan hanya jika ada file
        }
        const response = await axios.put(`${apiUrl}/user/update/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'api_key': apiKey,
                'Content-Type': 'multipart/form-data', // Pastikan menggunakan multipart/form-data untuk file upload
            },
        });


        if (response.data && response.data.user) {
            return response.data.user; // Kembalikan data user yang terupdate
        } else {
            console.error("Unexpected response format", response);
            throw new Error("Unexpected response format from server");
        }
    } catch (error) {
        console.error("Failed to update user profile:", error.response || error.message);
        throw error;
    }
};





