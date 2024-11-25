import axios from 'axios';
import Payment from '../../constructors/paymentModel'; // Ensure this path is correct

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getUserPayments = async () => {
    try {
        const response = await axios.get(`${apiUrl}/payments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Ensure that the data structure matches what's expected
        if (response.data && Array.isArray(response.data.payments)) {
            // Map response data to Membership instances
            return response.data.payments.map((payment) => new Payment(payment));
        }
    } catch (error) {
        // Handle specific error response if available
        console.error("Error fetching Payment:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch classes.");
    }
};



// Dashboard service exposes both methods
const paymentService = {
    getUserPayments,
};

export default paymentService;
