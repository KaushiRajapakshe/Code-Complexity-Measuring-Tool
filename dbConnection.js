const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Dilushika:dilu123@cluster0.euqiwxn.mongodb.net/"; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect();

module.exports = client;