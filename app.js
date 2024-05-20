const express = require('express');
const path = require('path');
const mockData = require('./mockData'); // Correct path to your mockData file
const userRoutes = require('./routes/userRoutes'); // Adjusted path to userRoutes.js

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api', userRoutes); // Use userRoutes for routing

// API endpoint to get user data by ID
app.get('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = mockData.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
