var express = require("express");

const cors = require('cors');
const path = require('path');


var app = express()
var port = process.env.port || 8090;

app.use(express.static(__dirname + '/'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8087');
//     res.setHeader('Access-Control-Allow-Methods', 'POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     next();
// });

app.use(cors({
    origin: 'http://localhost:8087'
  }));

require('./dbConnection.js');
let router = require('./src/routes/router.js');

let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use('/api/complexity', router);

const fileRoutes = require('./src/routes/fileRoutes');
app.use('/', fileRoutes);

app.get('/', (req, res) => {
    res.render(index.html);
});

app.get('/complexity', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'complexity.html'));
});

app.get('/recomplexity', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'recomplexity.html'));
});

//socket test
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

http.listen(port, () => {
    console.log("Listening on port ", port);
});
