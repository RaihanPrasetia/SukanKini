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
            throw new Error("No Category data found.");
        }
    } catch (error) {
        console.error("Failed to fetch bank info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};


const trainerService = {
    getTrainer,
};

export default trainerService;
