require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const prayerRoutes = require('./routes/prayerRoutes');
const partnershipRoutes = require('./routes/partnershipRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api', prayerRoutes);
app.use('/api/partnership', partnershipRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
