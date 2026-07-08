const express = require('express');
const router = express.Router();

// Basic health-check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Sample products route for testing
router.get('/products', (req, res) => {
  res.json([
    { id: 1, name: "Cyberpunk Cityscape Image", price: 5, type: "image" },
    { id: 2, name: "Abstract Neural Network Art", price: 3, type: "image" },
    { id: 3, name: "Neon Portrait Pack", price: 10, type: "bundle" }
  ]);
});

module.exports = router;
