const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '5d' });
};

// Hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword
};