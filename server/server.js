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

  socket.emit('newMessage', {
    from: 'Nikita',
    text: 'New Message',
    createdAt: 1223234
  })

  socket.on('createMessage', (message) => {
    console.log(message);
  })

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
}); //register an event listener

server.listen(port, () => {
  console.log(`App started on ${port}`);
})
