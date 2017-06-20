const express = require("express");
const socketIO = require('socket.io');
const http = require('http');

const path = require("path");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message.js');
const {generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.on('join', (params, callback) => { //подключаемся к комнате
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room); //присоединяемся к комнате
    users.removeUser(socket.id);//чтобы не было пользователя с таким же id
    users.addUser(socket.id, params.name, params.room); //добавляем пользователя

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app!"))//отправляет сообщение только одному пользователю
    socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined.`));//отсылает сообщение всем, кроме текущего пользователя
    //socket.leave(params.room);
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); //emits an event to every single connection

    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left the room.`));
    }
    console.log('Disconnected');
  });
}); //register an event listener

server.listen(port, () => {
  console.log(`App started on ${port}`);
})
