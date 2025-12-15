const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');  
const connectDB = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');
const rankingRoutes = require('./routes/rankingRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/schools', schoolRoutes);
app.use('/api/rankings', rankingRoutes);

// Root route
app.get('/api', (req, res) => {
  res.json({
    message: 'University Rankings API',
    version: '1.0.0',
    endpoints: {
      schools: '/api/schools',
      rankings: '/api/rankings',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});