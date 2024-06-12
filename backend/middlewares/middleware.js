const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;

        if (req.userRole !== 'ADMIN') {
            console.log("Token: ", token);
            console.log("Decoded token: ", decoded);
            console.log("User role from token: ", req.userRole);
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = {
    authenticate
};
