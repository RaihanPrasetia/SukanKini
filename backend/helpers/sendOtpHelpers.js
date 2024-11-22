const nodemailer = require('nodemailer');
const APP_EMAIL = process.env.APP_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;
// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: APP_EMAIL, // Gantilah dengan email Anda
        pass: APP_PASSWORD   // Gantilah dengan password email Anda
    }
});

// Fungsi untuk mengirim OTP ke email
const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: APP_EMAIL,
        to: email,
        subject: 'OTP Registration - Sukankini',
        text: `Your OTP for registration is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

module.exports = sendOTPEmail;
