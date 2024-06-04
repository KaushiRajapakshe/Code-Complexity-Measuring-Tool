const { MongoClient, ServerApiVersion } = require('mongodb');
const multer = require('multer');
const uri = "";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a MongoClient with a MongoClientOptions object to set the
// Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = { client, upload };