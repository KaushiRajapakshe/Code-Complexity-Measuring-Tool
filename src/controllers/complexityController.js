let collection = require('../models/complexity.js');

const postComplexity = (req, res) => {
    var newComplexity = req.body;
    collection.postComplexity(newComplexity, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: "Code Complexity successfully added" });
        }
        else {
            res.json({ statusCode: 400, message: err })
        }
    });
}

const getComplexity = (req, res) => {
    collection.getComplexity((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: "Get all factors of complexity success" });
        }
    });
}

module.exports = { postComplexity, getComplexity }