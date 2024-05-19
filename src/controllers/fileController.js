const fs = require('fs');
const { collection } = require('../app');
const multer = require('multer');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const formatCode = (code) => {
  return code.replace(/\s+/g, ' ');
};

const uploadFile = upload.single('file');

const handleUpload = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const data = fs.readFileSync(file.path, 'utf-8');
    await collection.insertOne({ name: file.originalname, data: data });
    const formattedCode = formatCode(data);
    res.send(formattedCode);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file.');
  }
};

module.exports = { uploadFile, handleUpload };