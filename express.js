const express = require('express');
const appRoutes = require('./backend/routes/appRoutes');
const apiKeyMiddleware = require('./backend/middleware/apiKeyMiddleware'); // Ensure this path is correct
const corsHelper = require('./backend/helpers/corsHelper'); // Import the CORS helper
const app = express();
const PORT = process.env.PORT_API || 3000;
const HOST = process.env.DB_HOST || 'localhost';

// Middleware setup
app.use(corsHelper()); // Use the CORS helper
app.use(express.json()); // Parse JSON bodies
app.use(apiKeyMiddleware); // Your custom API key middleware

// Ensure this is the correct router middleware
app.use('/api', appRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
