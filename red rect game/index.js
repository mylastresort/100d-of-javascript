let gameContainer=document.querySelector('.game-container')
let canvas=document.querySelector('canvas')
let context=canvas.getContext('2d')
let charSpeed=20;
let _2dimensions=new Map()
let obstacles=[]
let speed=1;
let player={
  food:[],
  makeFood:function(){
    context.clearRect(player.food[0],player.food[1],5,5)
    if(
      this.x+10-this.food[0]>0
      && this.food[0]+3.5-this.x>0
      && this.y+10-this.food[1]>0
      && this.food[1]+3.5-this.y>0
      ){
      this.score+=1;
      console.log(this.score);
      this.food=new Array()
    }
    if(!this.food.length){
      this.food.push(Math.floor(Math.random()*(canvas.width-10))+5)
      this.food.push(Math.floor(Math.random()*(canvas.height-10))+5)
    }
    context.beginPath()
    context.fillStyle='#ff4203'
    context.fillRect(this.food[0],this.food[1],5,5)
    context.closePath()
  },
  x:10,
  y:Math.floor(canvas.height/2),
  move:function(direction){
    context.clearRect(this.x,this.y,10,10)
    switch (direction) {
      case 'right':
        this.x+=speed;
        break;
      case 'left':
        this.x-=speed;
        break;
      case 'up':
        this.y-=speed;
        break;
      case 'down':
        this.y+=speed;
        break;
    }
    if(this.x<0){this.x=0}
    if(this.x+10>canvas.width){this.x=canvas.width-10}
    if(this.y<0){this.y=0}
    if(this.y+10>canvas.height){this.y=canvas.height-10}
    context.beginPath()
    context.fillStyle='#8503ff'
    context.fillRect(this.x,this.y,10,10)
    context.closePath()
  },
  score:0
}

setInterval(() => {
  obstacles.push(
    [canvas.width,
    Math.floor(Math.random()*canvas.height-20)+10]);
}, charSpeed*30);

document.onkeydown=(e)=>{
  switch (e.code) {
    case 'ArrowLeft':
      _2dimensions.set('x','left')
      break;
    case 'ArrowRight':
      _2dimensions.set('x','right')
      break;
    case 'ArrowUp':
      _2dimensions.set('y','up')
      break;
    case 'ArrowDown':
      _2dimensions.set('y','down')
      break;
  }
}

setInterval(()=>{
  player.move(_2dimensions.get('x'))
  player.move(_2dimensions.get('y'))
  player.makeFood()
  for (const i in obstacles) {
    context.clearRect(obstacles[i][0],obstacles[i][1],8,8)
    if(obstacles[i][0]+10<0){obstacles.shift()}
    obstacles[i][0]-=speed;
    context.beginPath()
    context.fillStyle='#7dff03'
    context.fillRect(obstacles[i][0],obstacles[i][1],7,7)
    context.closePath()
    if(player.x+10-obstacles[i][0]>0
      && obstacles[i][0]+7-player.x>0
      && player.y+10-obstacles[i][1]>0
      && obstacles[i][1]+7-player.y>0){
        console.log('here');
        context.clearRect(0,0,canvas.width,canvas.height)
        obstacles=[]
        _2dimensions=new Map()
        player.x=10;
        player.y=Math.floor(canvas.height/2)
        player.score=0;
        return;
      }
  }
  document.querySelector('#score').textContent=`Score : ${player.score}`
},charSpeed)
