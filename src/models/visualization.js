const { client } = require('../../dbConnection.js')
const getFiles = async () => {
    try {
        const db = client.db('code_complexity');
        const collection = db.collection('visualization');
        const files = await collection.find({}).toArray();
        return files;
    } catch (err) {
        console.error('Error fetching files:', err);
        throw err;
    }
};

module.exports = { getFiles};