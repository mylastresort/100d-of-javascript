let canvas=document.getElementById('canvas')
let context=canvas.getContext('2d')
canvas.width=700;
canvas.height=400;
let snake={
  x:15,
  y:15,
  width:15,
  height:15,
  direction:'right',
  size:[],
  speed:100,      //..milliseconds
  xb:()=>{return Math.floor(Math.random()*((canvas.width-20)/15))*15},
  yb:()=>{return Math.floor(Math.random()*((canvas.height-20)/15))*15}
}
let food={
  x:225,
  y:225
}
makeFood()
window.onkeydown=(e)=>{
  switch (e.code) {
    case 'ArrowRight':
      if(snake.direction==='left'){
        return false;
      }else{
        snake.direction='right'
      }
      break;
    case 'ArrowLeft':
      if(snake.direction==='right'){
        return false;
      }else{
        snake.direction='left'
      }
      break;
    case 'ArrowDown':
      if(snake.direction==='up'){
        return false;
      }else{
        snake.direction='down'
      }
      break;
    case 'ArrowUp':
      if(snake.direction==='down'){
        return false;
      }else{
        snake.direction='up'
      }
      break;
  }
}
setInterval(move, snake.speed);
function move(){
  check()
  context.fillStyle='#14ffec'
  switch (snake.direction) {
    case 'left':
      snake.x-=15;
      break;
    case 'right':
      snake.x+=15;
      break;
    case 'down':
      snake.y+=15;
      break;
    case 'up':
      snake.y-=15;
      break;
  }
  if(((snake.x)%15)===0 && ((snake.y)%15)===0){
    snake.size.push([snake.x,snake.y])
  }
  context.fillRect(snake.x,snake.y,snake.width,snake.height);

  if(snake.x===food.x && food.y===snake.y){
    makeFood();
  }else{
    if(snake.size.length>3 ){
      let last=snake.size.shift();
      context.clearRect(last[0],last[1],snake.width,snake.height)
      //TODO: fix this (when the snake return to itself)
      // if(snake.size.some(e=>{return (e[0]==snake.x && e[1]==snake.y)})){
      //   restart()
      // }
    }
  }
}

function check(){
  if(snake.x>canvas.width-20
  || snake.y>canvas.height-20
  || snake.x<0
  || snake.y<0){
    restart()
  }
}
function makeFood(){
  food.x=snake.xb()
  food.y=snake.yb()
  while(snake.size.forEach(e=>{return e[0]===food.x}) 
  && snake.size.forEach(e=>{return e[1]===food.y})){
    food.x=snake.xb()
    food.y=snake.yb()
    snake.size.push([snake.x,snake.y])
  }
  context.beginPath();
  context.fillStyle='#0d7377'
  context.fillRect(food.x,food.y,9,9)
  context.closePath()
}


function restart(){
  alert('failed');
  snake.x=15;
  snake.y=15;
  snake.direction='right'
  snake.size=new Array();
  context.clearRect(0,0,canvas.width,canvas.height)
  makeFood()
}