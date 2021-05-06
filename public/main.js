const socket = io();

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});
  console.log(instances);
  instances[0].open();
});

document.getElementById("sendNickname").disabled = true;
document.getElementById("nickname").addEventListener('keyup', (event) => {
  if(event.target.value === '') {
    document.getElementById("sendNickname").disabled = true;
  } else {
    document.getElementById("sendNickname").disabled = false;
  }
})

let nickname = "";

function getNickname() {
  nickname = document.getElementById('nickname').value;
  socket.emit('sendNickname', nickname);
}

socket.on('userJoin', (id) => {
  document.getElementById('field').addEventListener('mousemove', (event) => {
    document.getElementById('character').style.left = `${event.x}px`;
    document.getElementById('character').style.top = `${event.y}px`;

    socket.emit('playerPosition', {
      id: id,
      nickname: nickname,
      x: event.x,
      y: event.y
    });
  });

  socket.on('enemyJoin', ({enemyId, enemyNickname}) => {
    var toastHTML = `<span>${enemyNickname} acabou de entrar!</span>`;
    M.toast({html: toastHTML});

    const enemyPosition = document.createElement('div');
    enemyPosition.classList.add('enemy');
    enemyPosition.id = enemyId;
    enemyPosition.innerText = enemyNickname;
    document.querySelector('.main-container').appendChild(enemyPosition);
  });
  
  socket.on('enemyPosition', ({ id, nickname, x, y }) => {
    const foundEnemy = document.getElementById(`${id}`);

    if(!foundEnemy) {
      const enemyPosition = document.createElement('div');
      enemyPosition.classList.add('enemy');
      enemyPosition.id = id;
      document.querySelector('.main-container').appendChild(enemyPosition);
    }
    document.getElementById(`${id}`).style.left = `${x}px`;
    document.getElementById(`${id}`).style.top = `${y}px`;
  });

  socket.on('removeUser', (id) => {
    var toastHTML = `<span>${enemyNickname} acabou de entrar!</span>`;
    M.toast({html: toastHTML});
    document.getElementById(id).remove();
  })
});