const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/rules', adminController.getRules);
router.post('/rules', adminController.addRule);
router.put('/rules/:id', adminController.updateRule);
router.delete('/rules/:id', adminController.deleteRule);

module.exports = router;
