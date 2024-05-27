const { client } = require('../app');

const insertFile = async (fileData) => {
  try {
    const db = client.db('code_complexity');
    const collection = db.collection('files');
    const result = await collection.insertOne(fileData);
    return result;
  } catch (err) {
    console.error('Error inserting file:', err);
    throw err;
  }
};

const getFiles = async () => {
    try {
      const db = client.db('code_complexity');
      const collection = db.collection('files');
      const files = await collection.find({}).toArray();
      return files;
    } catch (err) {
      console.error('Error fetching files:', err);
      throw err;
    }
  };

module.exports = { insertFile , getFiles};