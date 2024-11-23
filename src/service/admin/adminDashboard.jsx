import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getDashboardCount = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/dashboard/count`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Periksa apakah data response sesuai dengan struktur yang diharapkan
        const data = response.data;

        if (
            typeof data.countDataMitra === 'number' &&
            typeof data.countDataUser === 'number' &&
            typeof data.countDataPayment === 'number' &&
            typeof data.countDataClass === 'number' &&
            typeof data.countTotal === 'number' &&
            data.paymentStatusCounts &&
            typeof data.paymentStatusCounts.diterima === 'number' &&
            typeof data.paymentStatusCounts.ditolak === 'number' &&
            typeof data.paymentStatusCounts.diproses === 'number'
        ) {
            return data;
        } else {
            throw new Error("Response structure is invalid.");
        }
    } catch (error) {
        console.error("Error fetching dashboard counts:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch dashboard counts.");
    }
};

// Ekspor object service
const adminDashboardService = {
    getDashboardCount,
};

export default adminDashboardService;
