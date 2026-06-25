require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes on both /api and / to support both local development and Vercel serverless
const mountRoutes = (prefix) => {
  app.use(`${prefix}projects`, projectRoutes);
  app.use(`${prefix}skills`, skillRoutes);
  app.use(`${prefix}experience`, experienceRoutes);
  app.use(`${prefix}contact`, contactRoutes);
  app.use(`${prefix}auth`, authRoutes);
};

mountRoutes('/api/');
mountRoutes('/');

// Database Connection
mongoose.set('bufferTimeoutMS', 2000); // Fail fast if DB isn't connected so operations don't hang
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
  serverSelectionTimeoutMS: 2000, // Fail fast if MongoDB isn't configured so the frontend can load fallback data instantly
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
