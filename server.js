const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import and use the routes
const fileRoutes = require('./src/routes/fileRoutes');
app.use('/', fileRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});