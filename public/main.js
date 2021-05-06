const socket = io();

socket.on('userJoin', (id) => {
  document.getElementById('field').addEventListener('mousemove', (event) => {
    document.getElementById('character').style.left = `${event.x}px`;
    document.getElementById('character').style.top = `${event.y}px`;
  
    socket.emit('playerPosition', {
      id: id,
      x: event.x,
      y: event.y
    });
  });

  socket.on('enemyJoin', (enemyId) => {
    const enemyPosition = document.createElement('div');
    enemyPosition.classList.add('enemy');
    enemyPosition.id = enemyId;
    document.querySelector('.container').appendChild(enemyPosition);
  });
  
  socket.on('enemyPosition', ({ id, x, y }) => {
    const foundEnemy = document.getElementById(`${id}`);

    if(!foundEnemy) {
      const enemyPosition = document.createElement('div');
      enemyPosition.classList.add('enemy');
      enemyPosition.id = id;
      document.querySelector('.container').appendChild(enemyPosition);
    }

    document.getElementById(`${id}`).style.left = `${x}px`;
    document.getElementById(`${id}`).style.top = `${y}px`;
  });

  socket.on('removeUser', (id) => {
    document.getElementById(id).remove();
  })
});