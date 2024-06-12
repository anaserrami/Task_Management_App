const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Create task
router.post('/tasks', async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                user: { connect: { id: parseInt(userId) } },
                status: 'TO_DO'
            }
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks for a user
router.get('/tasks/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: userId }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task
router.put('/tasks/:taskId', async (req, res) => {
    const { title, description, status } = req.body;
    const taskId = parseInt(req.params.taskId);
    try {
        const task = await prisma.task.update({
            where: { id: taskId },
            data: { title, description, status }
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/tasks/:taskId', async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    try {
        await prisma.task.delete({
            where: { id: taskId }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;