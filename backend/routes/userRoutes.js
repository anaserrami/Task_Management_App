const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middlewares/middleware');
const router = express.Router();
const prisma = new PrismaClient();

// Get all users
router.get('/users', authenticate, async (req, res) => {
    if (req.userRole !== 'ADMIN') {
        console.log("Token: ", token);
        console.log("Decoded token: ", decoded);
        console.log("User role from token: ", req.userRole);
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user details with tasks
router.get('/user/:userId', authenticate, async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (req.userRole !== 'ADMIN') {
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                tasks: true
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

// Delete a user
router.delete('/user/:userId', authenticate, async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (req.userRole !== 'ADMIN') {
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        await prisma.user.delete({
            where: { id: userId }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;