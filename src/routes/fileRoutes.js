const express = require('express');
const path = require('path');
const router = express.Router();
const { uploadFile, handleUpload } = require('../controllers/fileController');

router.post('/upload', uploadFile, handleUpload);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;