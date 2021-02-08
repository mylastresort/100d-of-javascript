let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
canvas.width = 700;
canvas.height = 400;
let snake = {
  x: null,
  y: null,
  width: 15,
  height: 15,
  direction: null,
  size: new Array(),
  speed: 75,      //increase the number to lower the speed
  randomX: _ => Math.floor(Math.random() * ((canvas.width - 20) / 15)) * 15,
  randomY: _ => Math.floor(Math.random() * ((canvas.height - 20) / 15)) * 15,
  score: 0
}
let food = { x: 225, y: 225 }



window.onkeydown = _ => {
  if (_.code === 'ArrowRight') {
    if (snake.direction === 'left') return false;
    else snake.direction = 'right';
  }
  if (_.code === 'ArrowLeft') {
    if (snake.direction === 'right') return false;
    else snake.direction = 'left';
  }
  if (_.code === 'ArrowDown') {
    if (snake.direction === 'up') return false;
    else snake.direction = 'down';
  }
  if (_.code === 'ArrowUp') {
    if (snake.direction === 'down') return false;
    else snake.direction = 'up';
  }
}


function check() {
  if (snake.x > canvas.width - 20
    || snake.y > canvas.height - 20
    || snake.x < 0
    || snake.y < 0) restart()
}

function makeFood() {
  do {
    food.x = snake.randomX()
    food.y = snake.randomY()
    alreadyExist = snake.size.some(_ => { return (food.x === _[0] && food.y === _[1]) })
  } while (alreadyExist);
  snake.size.push([snake.x, snake.y])

  context.fillStyle = '#0d7377';
  context.fillRect(food.x, food.y, 9, 9);
}

function restart() {
  snake.x = 15;
  snake.y = 60;
  snake.direction = 'right'
  snake.size = new Array();
  context.clearRect(0, 0, canvas.width, canvas.height)
  if (JSON.parse(localStorage.getItem('highest-score')) <= snake.score) { localStorage.setItem('highest-score', JSON.parse(snake.score)) }
  snake.score = 0;
  document.querySelector('#score').textContent = 'Score : 0'
  document.querySelector('#highest-score').textContent = `Highest Score : ${JSON.parse(localStorage.getItem('highest-score'))}`
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
    if (JSON.parse(localStorage.getItem('highest-score')) <= snake.score) {
      document.querySelector('#highest-score').textContent = `Highest Score : ${snake.score}`
    }
    makeFood();
  } else {
    for (const i of snake.size.slice(0, -1)) {
      if (i[0] === snake.x && i[1] === snake.y) {
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

window.onload = _ => {
  makeFood();
  setInterval(move, snake.speed);
}
