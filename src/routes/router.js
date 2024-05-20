let express = require('express');
let router = express.Router();
let controller = require('../controllers/complexityController.js');

router.post('/', async (req, res) => {
    await controller.postComplexity(req, res);
});

router.get('/', async (req, res) => {
    await controller.getComplexity(req, res);
});

module.exports = router;