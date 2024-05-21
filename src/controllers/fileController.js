const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { insertFile } = require('../models/fileModel');
const prettier = require('prettier');


// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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

const formatCode = async (code) => {
  try {
    // Dynamically import the prettier-plugin-java
    const prettierPluginJava = await import('prettier-plugin-java');

    // Format the code using Prettier with Java parser
    const formattedCode = prettier.format(code, {
      parser: 'java',
      plugins: [prettierPluginJava.default], // Use .default to get the module's default export
    });
    return formattedCode;
  } catch (error) {
    console.error('Error formatting code:', error);
    // If an error occurs during formatting, return the original code
    return code;
  }
};

const uploadFile = upload.single('file');

const handleUpload = async (req, res) => {
  //console.log("sdfghj", res, "fghjk", req)
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const data = fs.readFileSync(file.path, 'utf-8');
    const fileData = { name: file.originalname, data: data };
    await insertFile(fileData);
    //const formattedCode = formatCode(data);
    const formattedCode = await formatCode(data); // Await the formatting function
    res.send(formattedCode);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file.');
  }
};

const getHistory = async (req, res) => {
  try {
    const files = await getFiles();
    res.json(files);
    console.log(res);
  } catch (err) {
    console.error('Error fetching file history:', err);
    res.status(500).send('Error fetching file history.');
  }
};

module.exports = { uploadFile, handleUpload , formatCode , getHistory};
