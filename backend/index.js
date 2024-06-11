const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});