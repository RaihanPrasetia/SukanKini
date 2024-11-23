import axios from 'axios';
import Bank from '../../constructors/bankModel';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getBankMitraById = async (userId) => {
    try {
        const response = await axios.get(`${apiUrl}/bank/mitra/class/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        if (response.data && Array.isArray(response.data.bank)) {
            // Map response data to Membership instances
            return response.data.bank.map((bank) => new Bank(bank));
        } else {
            throw new Error("No class data found in the response.");
        }
    } catch (error) {
        console.error("Failed to fetch bank info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const bankMitraService = {
    getBankMitraById
};

export default bankMitraService;