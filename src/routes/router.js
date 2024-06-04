let express = require('express');
let router = express.Router();
let controllerV = require("../controllers/visualizationController.js");
let controllerC = require("../controllers/complexityController.js");

router.post('/', async (req, res) => {
    await controllerC.postComplexity(req, res);
});

router.get('/', async (req, res) => {
    await controllerC.getComplexity(req, res);
});

router.post('/factors', async (req, res) => {
    await controllerC.postComplexityFactors(req, res);
});

router.get('/factors', async (req, res) => {
    await controllerC.getComplexityFactors(req, res);
});

router.delete('/factors', async (req, res) => {
    await controllerC.deleteComplexityFactors(req, res);
});
router.get('/visualization', async (req, res) => {
    await controllerV.getVisualization(req, res);
});

module.exports = router;