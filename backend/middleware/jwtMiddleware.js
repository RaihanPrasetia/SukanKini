const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(400).json({ message: ' Bad Request.' });
    }
};


module.exports = authenticateJWT;