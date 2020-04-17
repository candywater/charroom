var express = require("express")
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require("path")

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", 'index.html'));
});

app.use('/node_modules', express.static(path.join(__dirname, "../", 'node_modules')))

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit("chat message", msg);
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
