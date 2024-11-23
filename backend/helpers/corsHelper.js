const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'api_key'],
    credentials: true,
};

const corsHelper = () => cors(corsOptions);

module.exports = corsHelper;
