const { client } = require('../../dbConnection.js');

const getComplexity = (callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            const collection = client.db("code_complexity").collection('complexity');
            collection.find({}).toArray(callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}

const postComplexity = (card, callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            const collection = client.db("code_complexity").collection('complexity');
            collection.insertOne(card, callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}

module.exports = { postFood, getAllFoods }