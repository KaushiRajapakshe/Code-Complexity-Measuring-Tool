const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

// Connection URL
const url = process.env.MONGODB_HOST;

// Database Name
const dbName = 'test';


const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(cookieParser());



// Check for database connection before starting the server
client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB server');
    const db = client.db(dbName);

    // Pass the db instance to the request
    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    // Routes
    const authRoutes = require('./routes/authRoutes');
    const profileRoutes = require('./routes/profileRoutes');
    const homeRoutes = require('./routes/homeRoutes');

    app.use('/', authRoutes);
    app.use('/', profileRoutes);
    app.use('/', homeRoutes);

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on Port: ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the application with an error code
  });
