import axios from 'axios';
import Bank from '../../constructors/bankModel';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getBankMitraById = async (bankId) => {
    try {
        const response = await axios.get(`${apiUrl}/bank/mitra/${bankId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        return new Bank(response.data.bank);
    } catch (error) {
        console.error("Failed to fetch bank info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const bankMitraService = {
    getBankMitraById
};

export default bankMitraService;