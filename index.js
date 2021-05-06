const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app); // cria o servidor baseado no express
const io = socketio(server); // utiliza o servidor para criar a conexão client/server

app.use(express.static(path.join(__dirname, 'public'))); // seta a pasta public como fonte do conteúdo "frontend"

io.on('connection', socket => {
  socket.emit('userJoin', socket.id);
  socket.on('sendNickname', nickname => {
    if (nickname) {
      socket.broadcast.emit('enemyJoin', { enemyId: socket.id, enemyNickname: nickname });
    }
  });

  socket.on('playerPosition', ({ id, nickname, x, y }) => {
    socket.broadcast.emit('enemyPosition', { id, nickname, x, y })
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('removeUser', socket.id);
  })
});

server.listen(process.env.PORT || 3000, () => console.log(`Servidor rodando na porta ${process.env.PORT || 3000} ⚡️`));