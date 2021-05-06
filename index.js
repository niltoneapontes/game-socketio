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
  socket.broadcast.emit('enemyJoin', socket.id);

  socket.on('playerPosition', ({ id, x, y }) => {
    socket.broadcast.emit('enemyPosition', { id, x, y })
  })
});

server.listen(3000 || process.env.PORT, () => console.log('Servidor rodando na porta 3000 ⚡️'));