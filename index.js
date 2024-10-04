const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const loginRoutes = require('./routes/login'); 
const weatherRoutes = require('./routes/weather');
const authenticateToken = require('./routes/authentication'); // Middleware to verify JWT token

app.use(express.json()); // Parse incoming JSON requests

// Protect these routes with the JWT authentication middleware
app.use('/weather', authenticateToken, weatherRoutes);

// Public route for login
app.use('/login', loginRoutes); 

// Handle 404 errors for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Path not found' });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});