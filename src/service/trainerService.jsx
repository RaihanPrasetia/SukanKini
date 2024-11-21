import axios from 'axios';
import Trainer from '../constructors/trainerConstructor';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getTrainer = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/trainers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        if (response.data && response.data.trainers) {
            return response.data.trainers.map(trainer => new Trainer(trainer)); // Mapping each payment response to the Payment model
        } else {
            throw new Error("No Trainer data found.");
        }
    } catch (error) {
        console.error("Failed to fetch Trainer info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const createTrainer = async (name, age, image_path, phone, alamat) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("alamat", alamat);
        formData.append("phone_number", phone);
        if (image_path) {
            formData.append("image_path", image_path); // Tambahkan hanya jika ada file
        }
        const response = await axios.post(`${apiUrl}/mitra/trainers/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        if (response.data && response.data.trainer) {
            return new Trainer(response.data.trainer); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Failed to fetch Trainer info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
}
const updateTrainer = async (name, age, image_path, phone, alamat, trainerId) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("alamat", alamat);
        formData.append("phone_number", phone);
        if (image_path) {
            formData.append("image_path", image_path); // Tambahkan hanya jika ada file
        }
        const response = await axios.put(`${apiUrl}/mitra/trainers/update/${trainerId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        if (response.data && response.data.trainer) {
            return new Trainer(response.data.trainer); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Failed to fetch Trainer info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
}

const deleteTrainer = async (trainerId) => {
    try {
        await axios.delete(`${apiUrl}/mitra/trainers/delete/${trainerId}`, {
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


const trainerService = {
    getTrainer,
    createTrainer,
    updateTrainer,
    deleteTrainer,
};

export default trainerService;
