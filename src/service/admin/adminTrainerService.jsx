import axios from "axios";
import Trainer from "../../constructors/trainerConstructor"; // Assuming this is a constructor function for Payment

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getAdminTrainer = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/trainers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.trainers) {
            return response.data.trainers.map(trainer => new Trainer(trainer));
        } else {
            throw new Error("No payment data found.");
        }
    } catch (error) {
        console.error("Error fetching payments:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch payments");
    }
};

const adminTrainerService = {
    getAdminTrainer,
};

export default adminTrainerService;
