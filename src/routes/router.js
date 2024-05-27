let express = require('express');
let router = express.Router();
let controller = require("../controllers/complexityController.js");

router.post('/', async (req, res) => {
    await controller.postComplexity(req, res);
});

router.get('/', async (req, res) => {
    await controller.getComplexity(req, res);
});

router.post('/factors', async (req, res) => {
    await controller.postComplexityFactors(req, res);
});

router.get('/factors', async (req, res) => {
    await controller.getComplexityFactors(req, res);
});

router.delete('/factors', async (req, res) => {
    await controller.deleteComplexityFactors(req, res);
});
// router.post('/', async (req, res) => {
//     await controller.updateComplexity(req, res);
// });

// router.delete('/', async (req, res) => {
//     await controller.deleteComplexity(req, res);
// });

module.exports = router;