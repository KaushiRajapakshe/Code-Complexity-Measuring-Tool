
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { authenticateToken } = require('../models/userModel');

router.get('/home', authenticateToken, homeController.getHome);
router.get('/', authenticateToken, homeController.getHome);

module.exports = router;
