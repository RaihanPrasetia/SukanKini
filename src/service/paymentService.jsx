import axios from "axios";
import Payment from "../constructors/paymentModel"; // Assuming this is a constructor function for Payment

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const createPayment = async ({ bankId, total, paymentProof }) => {
    try {
        const formData = new FormData();
        formData.append("bank_id", bankId);
        formData.append("total", total);
        formData.append("bukti", paymentProof);

        const response = await axios.post(
            `${apiUrl}/mitra/payments/create`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    api_key: apiKey,
                },
            }
        );

        // Check if the response contains payment data
        if (response.data && response.data.message) {
            return { message: response.data.message };
        }
    } catch (error) {
        console.error("Error creating payment:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to create payment");
    }
};

const getPaymentStatus = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/payments/status`, {
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
const getPayments = async () => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/payments`, {
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

const getPaymentById = async (paymentId) => {
    try {
        const response = await axios.get(`${apiUrl}/mitra/payments/${paymentId}`, {
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
const updatePaymentById = async ({ paymentId, status }) => {
    try {
        // Pastikan API menerima data dengan benar
        const response = await axios.put(
            `${apiUrl}/mitra/payments/update/${paymentId}`,
            { status_pembayaran: status }, // Data yang dikirim ke server
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    api_key: apiKey,
                    "Content-Type": "application/json", // Menjamin format JSON
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
    createPayment,
    getPaymentStatus,
    getPaymentById,
    getPayments,
    updatePaymentById
};

export default paymentService;
