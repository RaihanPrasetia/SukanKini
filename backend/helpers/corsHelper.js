const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'api_key'],
    credentials: true, // Include if you want to allow cookies
};

const corsHelper = () => cors(corsOptions);

module.exports = corsHelper;
