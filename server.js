const express = require('express');
const routes = require('./routers/router');

const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app; // Export the app for testing

