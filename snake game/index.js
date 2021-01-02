let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
canvas.width = 700;
canvas.height = 400;
let snake = {
  x: 15,
  y: 15,
  width: 15,
  height: 15,
  direction: 'right',
  size: new Array(),
  speed: 100,      //increase the number to lower the speed
  randomX: () => { return Math.floor(Math.random() * ((canvas.width - 20) / 15)) * 15 },
  randomY: () => { return Math.floor(Math.random() * ((canvas.height - 20) / 15)) * 15 },
  score: 0
}
let food = { x: 225, y: 225 }
makeFood()


window.onkeydown = _ => {
  if (_.code === 'ArrowRight') {
    if (snake.direction === 'left') return false
    else snake.direction = 'right'
  }
  if (_.code === 'ArrowLeft') {
    if (snake.direction === 'right') return false
    else snake.direction = 'left'
  }
  if (_.code === 'ArrowDown') {
    if (snake.direction === 'up') return false
    else snake.direction = 'down'
  }
  if (_.code === 'ArrowUp') {
    if (snake.direction === 'down') return false
    else snake.direction = 'up'
  }
}

setInterval(move, snake.speed);

function check() {
  if (snake.x > canvas.width - 20
    || snake.y > canvas.height - 20
    || snake.x < 0
    || snake.y < 0 ) restart()
}

function makeFood() {
  do {
    food.x = snake.randomX()
    food.y = snake.randomY()
    alreadyExist = snake.size.some(_ => { return (food.x === _[0] && food.y === _[1]) })
  } while (alreadyExist);
  snake.size.push([snake.x, snake.y])

  context.beginPath();
  context.fillStyle = '#0d7377'
  context.fillRect(food.x, food.y, 9, 9)
  context.closePath()
}

function restart() {
  alert('failed');
  snake.x = 15;
  snake.y = 15;
  snake.direction = 'right'
  snake.size = new Array();
  context.clearRect(0, 0, canvas.width, canvas.height)
  snake.score = 0;
  document.querySelector('#score').textContent = 'Score : 0'
  makeFood()
}

function move() {
  check()
  context.fillStyle = '#14ffec'
  if (snake.direction === 'left') snake.x -= 15
  if (snake.direction === 'right') snake.x += 15
  if (snake.direction === 'down') snake.y += 15
  if (snake.direction === 'up') snake.y -= 15

  if (((snake.x) % 15) === 0 && ((snake.y) % 15) === 0) snake.size.push([snake.x, snake.y])

  context.fillRect(snake.x, snake.y, snake.width, snake.height);

  if (snake.x === food.x && food.y === snake.y) {
    document.querySelector('#score').textContent = `Score : ${snake.score += 1}`
    makeFood();
  } else {
    for (const i of snake.size.slice(0,-1)) {
      if(i[0] === snake.x && i[1] === snake.y) {
      console.log('contradiction');
      restart()
      }
    }
  }

  if (snake.size.length > 3) {
    let last = snake.size.shift()
    context.clearRect(last[0], last[1], snake.width, snake.height)
  }
}