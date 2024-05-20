const express = require('express');
const router = express.Router();
const users = require('../mockData'); // Adjust the path as necessary

// Route to get all users
router.get('/users', (req, res) => {
  res.json(users);
});

// Route to get a user by ID
router.get('/user-result/:id', (req, res) => {
    const userId = req.params.id;
    const user = mockData.find(user => user.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });

// Route to simulate assigning a grade (mock implementation)
router.post('/assign-grade', (req, res) => {
  const { id, complexityScore } = req.body;
  let grade;
  let suggestions = [];

  if (complexityScore >= 80) {
    grade = 'A';
    suggestions = [
      "Simplify nested control structures.",
      "Refactor deeply nested loops or conditionals.",
      "Break down complex logic into smaller, more manageable functions.",
      "Utilize switch statements or refactor to simplify conditional branching."
    ];
  } else if (complexityScore >= 70) {
    grade = 'B';
    suggestions = [
      "Consider modularizing your code.",
      "Review and optimize algorithm efficiency.",
      "Enhance readability by using meaningful variable names."
    ];
  } else {
    grade = 'C';
    suggestions = [
      "Review the structure of your code.",
      "Simplify and refactor where possible.",
      "Improve comments and documentation."
    ];
  }

  res.json({ id, complexityScore, grade, suggestions });
});

module.exports = router;
