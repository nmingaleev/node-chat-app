const express = require("express");
const socketIO = require('socket.io');
const http = require('http');

const path = require("path");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected'); 

  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    }); //emits an event to every single connection
  })

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
}); //register an event listener

server.listen(port, () => {
  console.log(`App started on ${port}`);
})
