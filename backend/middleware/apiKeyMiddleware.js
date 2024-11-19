const validateApiKey = require('../helpers/apiKeyHelper');

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api_key'];

    if (!apiKey) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if (!validateApiKey(apiKey)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    req.apiKey = apiKey;

    next();
};

module.exports = apiKeyMiddleware;
