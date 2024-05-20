let collection = require('../models/code');

function getData(req, res) {
    const data = module.getData();
    res.json(data);
}

module.exports = {
    getData
};