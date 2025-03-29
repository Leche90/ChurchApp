require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Routes
app.use('/api/donations', donationRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
