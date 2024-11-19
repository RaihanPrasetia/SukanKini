import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getClasses = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/payments/status`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Check if the response contains payments data
        if (response.data && response.data.payments) {
            return response.data.payments.map(payment => new Payment(payment)); // Mapping each payment response to the Payment model
        } else {
            throw new Error("No payment data found.");
        }
    } catch (error) {
        console.error("Error fetching payments:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch payments");
    }
};