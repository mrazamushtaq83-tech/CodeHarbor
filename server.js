const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Test API page route
app.get('/test-api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test-api.html'));
});

// Routes
const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
