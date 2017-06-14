const express = require("express");
const socketIO = require('socket.io');
const http = require('http');

const path = require("path");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app!"))

  socket.broadcast.emit('newMessage', generateMessage("Admin", "New user connected"));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text)); //emits an event to every single connection
    callback('This is from the server.');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
}); //register an event listener

server.listen(port, () => {
  console.log(`App started on ${port}`);
})
