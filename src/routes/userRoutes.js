const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/result', userController.getUserResult);

module.exports = router;
