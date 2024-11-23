import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getCountData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/jumlah`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Inisialisasi objek sesuai dengan response yang diterima
        if (response.data) {
            console.log(response.data.countMemberships)
            const { countClasses, countMemberships, countTotal, paymentStatusCounts } = response.data;
            return {
                countClasses,
                countMemberships,
                countTotal,
                paymentStatusCounts // Include paymentStatusCounts in the returned object
            };

        } else {
            throw new Error("No data found.");
        }
    } catch (error) {
        console.error("Failed to fetch count data:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch count data");
    }
};

const countService = {
    getCountData,
};

export default countService;
