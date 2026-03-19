// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const translateRoutes = require('./src/routes/translateRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', translateRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', message: 'Naija Translator API is running 🇳🇬' });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Translator is live! running in ${PORT}`);  
});