const express = require('express');
const router = express.Router();

// Import all resource routers
const userRoutes = require('./users');
const imageRoutes = require('./images');
const transactionRoutes = require('./transactions');

// Mount resource routes
router.use('/users', userRoutes);
router.use('/images', imageRoutes);
router.use('/transactions', transactionRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
