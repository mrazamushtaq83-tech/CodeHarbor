const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Import all resource routers
const authRoutes = require('./auth');
const userRoutes = require('./users');
const imageRoutes = require('./images');
const transactionRoutes = require('./transactions');

// Public routes
router.use('/auth', authRoutes);

// Protected routes (require JWT)
router.use('/users', authenticate, userRoutes);
router.use('/images', authenticate, imageRoutes);
router.use('/transactions', authenticate, transactionRoutes);

// Health check (public)
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
