const express = require('express');

const app = express();

const axios =require('axios')

const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {origin:'*'}
})

io.on('connection', (socket) => {
   
    //broadcating esponse from laravel server
   socket.on('chatMessage', (newText) => {
        console.log('message: ' + newText.user_id);
       io.emit('broadcastMessage', newText);
   });
    
    //diconnecting the user
    socket.on('Disconnect', (socket) =>
    {
        console.log('disconnected');
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
