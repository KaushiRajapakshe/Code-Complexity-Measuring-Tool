var express = require("express");

const cors = require('cors');
const path = require('path');

let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection');
let router = require('./routers/router');
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

var app = express()
var port = process.env.port || 3000;

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

app.use('/api', router);

app.get('/', (req, res) => {
    res.render(index.html);
});

app.get('/complexity', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'complexity.html'));
});

app.get('/recomplexity', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'recomplexity.html'));
});

app.get('/visualization', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'visualization.html'));
});
//socket test
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

http.listen(port, () => {
    console.log("Listening on port ", port);
});
