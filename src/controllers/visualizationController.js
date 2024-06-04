const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { getFiles } = require('../models/visualization');
const prettier = require('prettier');

const getVisualization = async (req, res) => {
    try {
        const files = await getFiles();
        res.json(files);
    } catch (err) {
        console.error('Error fetching file visualization:', err);
        res.status(500).send('Error fetching file visualization.');
    }
};





module.exports = { getVisualization};
