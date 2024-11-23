import axios from 'axios';
import Bank from '../constructors/bankModel';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getBankMitra = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/bank`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        // Inisialisasi objek Bank menggunakan konstruktor
        if (response.data && Array.isArray(response.data.banks)) {
            // Map response data to Membership instances
            return response.data.banks.map((bank) => new Bank(bank));
        } else {
            throw new Error("No class data found in the response.");
        }
    } catch (error) {
        console.error("Failed to fetch bank info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
};

const createBank = async ({ brand, no_rek, an }) => {
    try {
        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("no_rek", no_rek);
        formData.append("an", an);
        const response = await axios.post(`${apiUrl}/mitra/banks/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        if (response.data && response.data.bank) {
            return new Bank(response.data.bank); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Failed to fetch Trainer info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
}

const updateBank = async (bankId, { brand, no_rek, an }) => {
    try {
        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("no_rek", no_rek);
        formData.append("an", an);
        const response = await axios.put(`${apiUrl}/mitra/banks/update/${bankId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });
        if (response.data && response.data.bank) {
            return new Bank(response.data.bank); // Buat instance Class
        } else {
            throw new Error("Class creation failed, no Class data in response.");
        }
    } catch (error) {
        console.error("Failed to fetch Trainer info:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch bank info");
    }
}
const deleteBank = async (bankId) => {
    try {
        await axios.delete(`${apiUrl}/mitra/banks/delete/${bankId}`, {
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
const bankMitraService = {
    getBankMitra,
    createBank,
    updateBank,
    deleteBank
};

export default bankMitraService;