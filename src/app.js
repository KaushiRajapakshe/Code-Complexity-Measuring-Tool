const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://thari123:thari123@cluster0.01zhtfo.mongodb.net/';
const databaseName = 'code_complexity';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;

async function runDBConnection() {
  try {
    await client.connect();
    db = client.db(databaseName);
    console.log('MongoDB connection connected successfully');
  } catch (err) {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  }
}

runDBConnection();

module.exports = { client, db, runDBConnection };