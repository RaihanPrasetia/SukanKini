import axios from "axios";
import Payment from "../../constructors/paymentModel"; // Assuming this is a constructor function for Payment

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


const getAdminPayments = async () => {
    try {
        const response = await axios.get(`${apiUrl}/admin/payments/mitra`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.payments) {
            return response.data.payments.map(payment => new Payment(payment));
        } else {
            throw new Error("No payment data found.");
        }
    } catch (error) {
        console.error("Error fetching payments:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch payments");
    }
};

const getAdminPaymentById = async (paymentId) => {
    try {
        const response = await axios.get(`${apiUrl}/admin/payments/mitra/${paymentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        // Check if the response contains payments data
        if (response.data && response.data.payments) {
            return new Payment(response.data.payment);
        } else {
            throw new Error("No payment data found.");
        }
    } catch (error) {
        console.error("Error fetching payments:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to fetch payments");
    }
};

const updateAdminPaymentById = async ({ paymentId, status }) => {
    try {
        const response = await axios.put(
            `${apiUrl}/admin/payments/mitra/update/${paymentId}`,
            { status_pembayaran: status },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    api_key: apiKey,
                    "Content-Type": "application/json",
                },
            }
        );

        // Validasi respons apakah data pembayaran tersedia
        if (response.data && response.data.payment) {
            return new Payment(response.data.payment);
        } else {
            throw new Error("Payment data is missing in the response.");
        }
    } catch (error) {
        console.error("Error updating payment status:", error.message || error);
        throw new Error(
            error.response?.data?.message || "Failed to update payment status"
        );
    }
};


const paymentService = {

    getAdminPayments,
    getAdminPaymentById,
    updateAdminPaymentById
};

export default paymentService;
