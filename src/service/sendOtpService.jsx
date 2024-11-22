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

        if (response.data && response.data.success) {
            // Return only the message from the response
            return { message: response.data.success };
        } else {
            throw new Error("Payment creation failed. No message in response.");
        }
    } catch (error) {
        console.error('Error fetching class info:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch class info');
    }
}

const sendOtpService = {
    sendOtp,
};

export default sendOtpService;
