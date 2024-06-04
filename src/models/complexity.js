const { client } = require('../../dbConnection.js')

const getComplexity = (id, callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            const query = { id: id };
            const collection = client.db("code_complexity").collection('complexity');
            collection.findOne(query, { sort: { dateField: -1 } }, callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}

const postComplexity = (complexity, callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            var uid = complexity.id;
            const collection = client.db("code_complexity").collection('complexity');
            collection.insertOne(complexity, callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}


const postComplexityFactors = (factors, callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            const collection = client.db("code_complexity").collection('complexityfactors');
            collection.insertOne(factors, callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}

const getComplexityFactors = (id, callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            const query = { id: id };
            const collection = client.db("code_complexity").collection('complexityfactors');
            collection.findOne(query, callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}

const updateComplexityFactors = (factors, callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            const query = { _id: factors._id };
            const collection = client.db("code_complexity").collection('complexityfactors');
            collection.updateOne(query, callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}

const deleteComplexityFactors = (id, callback) => {
    try {
        client.connect((err) => {
            if (!err) {
                console.log('MongoDB connection connected')
            }
            const query = { _id: id };
            const collection = client.db("code_complexity").collection('complexityfactors');
            collection.deleteOne(query, callback);
        });
    } catch (ex) {
        console.error(ex);
    }
}

module.exports = { postComplexity, getComplexity, postComplexityFactors, getComplexityFactors, updateComplexityFactors, deleteComplexityFactors }