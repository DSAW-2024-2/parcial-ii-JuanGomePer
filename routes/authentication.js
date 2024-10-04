const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // The token is in "Bearer TOKEN" format

    if (token == null) return res.status(403).send('Invalid JWT Token'); // Token not provided

    // Verify the token using the secret
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid JWT Token'); // Token is invalid or has expired
        req.user = user; // Store user information in the request
        next(); // Proceed to the next middleware or route
    });
}

module.exports = authenticateToken;
