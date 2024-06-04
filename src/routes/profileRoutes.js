
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../models/userModel');

router.get('/profile/:username', authenticateToken, profileController.getProfile);
router.post('/update-profile', authenticateToken, profileController.postUpdateProfile);
router.post('/deactivate-profile', authenticateToken, profileController.deactivateProfile);

module.exports = router;
