require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Test API page
app.get('/test-api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test-api.html'));
});

// Mount all API routes under /api
const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_URL}`);
});
