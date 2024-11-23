import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const sendOtp = async (email, otp) => {
    try {
        const formData = new FormData();

        formData.append("email", email);
        formData.append("otp", otp);

        const response = await axios.post(`${apiUrl}/send-otp`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                api_key: apiKey,
            },
        });

        if (response.data && response.data.success && response.data.message) {
            // Return success and message
            return { success: response.data.success, message: response.data.message };
        } else {
            throw new Error("Gagal mengirim OTP. Respons tidak memiliki pesan.");
        }
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw new Error(error.response?.data?.message || "Gagal mengirim OTP.");
    }
};


const sendOtpService = {
    sendOtp,
};

export default sendOtpService;
