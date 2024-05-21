const express = require('express');
const path = require('path');
const router = express.Router();
const { uploadFile, handleUpload ,formatCode, getHistory } = require('../controllers/fileController');

router.post('/upload', uploadFile, handleUpload, formatCode);
router.get('/history/files', getHistory);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/history.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/history.html'));
});

module.exports = router;