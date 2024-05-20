const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kaushi1:root123@cluster0.ycoyequ.mongodb.net/, ";

// Create a MongoClient with a MongoClientOptions object to set the
// Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
module.exports = { client };