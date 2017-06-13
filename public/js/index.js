var socket = io();

socket.on('connect', function () { //Listens to an event
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Pavel',
    text: 'Hey! Whats up?'
  })

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message: ', message);
});
