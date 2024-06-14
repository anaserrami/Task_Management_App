const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middlewares/middleware');
const { generateToken, hashPassword, comparePassword } = require('../auth');
const router = express.Router();
const prisma = new PrismaClient();

// User signup
router.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                role: 'USER'
            }
        });
        const token = generateToken(user.id, user.role);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin signup
router.post('/signup/admin', async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                role: 'ADMIN'
            }
        });
        const token = generateToken(user.id, user.role);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && await comparePassword(password, user.password)) {
            const token = generateToken(user.id, user.role);
            res.json({ user, token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user profile
router.get('/profile/:userId', authenticate, async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                email: true,
                phone: true,
                role: true
            }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.put('/profile/:userId', authenticate, async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { name, phone, newPassword } = req.body;
    try {
        const updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (newPassword) {
            const hashedPassword = await hashPassword(newPassword);
            updateData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;