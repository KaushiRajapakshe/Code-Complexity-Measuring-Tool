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
    var id = req.query.id;
    collection.getComplexity(id, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: "Get user "+id+"'s code complexity success" });
        }
    });
}

const postComplexityFactors = (req, res) => {
    var newComplexityFactors = req.body;
    collection.postComplexityFactors(newComplexityFactors, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: "Code Complexity factors successfully added" });
        }
        else {
            res.json({ statusCode: 400, message: err })
        }
    });
}

const getComplexityFactors = (req, res) => {
    var id = req.query.id;
    collection.getComplexityFactors(id, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: "Get user "+id+"'s factors of complexity success"});
        }
    });
}

const updateComplexityFactors = (req, res) => {
    var newComplexityFactors = req.body;
    collection.updateComplexityFactors(newComplexityFactors, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: "Update factor "+newComplexityFactors._id+"'s factors of complexity success"});
        }
    });
}

const deleteComplexityFactors = (req, res) => {
    var id = req.body._id;
    collection.deleteComplexityFactors(id, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: "Delete factor "+id+"'s factors of complexity success"});
        }
    });
}
module.exports = { postComplexity, getComplexity, postComplexityFactors, getComplexityFactors, updateComplexityFactors, deleteComplexityFactors }