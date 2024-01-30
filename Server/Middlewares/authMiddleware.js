const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('x-auth-token');

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied, token missing' });
    }

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, 'your_secret_key');

        // Attach the user ID to the request for use in subsequent middleware or routes
        req.userId = decoded.userId;

        // Continue to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authorization denied, invalid token' });
    }
};

module.exports = authMiddleware;