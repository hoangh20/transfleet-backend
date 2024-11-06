const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()


const authMiddleware = (req, res) => {
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        const { payload } = user;
        if (payload.isAdmin) {
            next()
        } else {
        res.status(403).json({ message: 'You are not authorized to access this route' });
    }
    });
}

module.exports = {
    authMiddleware,
}