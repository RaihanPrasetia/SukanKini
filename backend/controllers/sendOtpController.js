const sendOTPEmail = require("../helpers/sendOtpHelpers");

const sendOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Send OTP to user's email
        await sendOTPEmail(email, otp);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.json({ success: false, message: 'Failed to send OTP.' });
    }
};

module.exports = { sendOtp };
