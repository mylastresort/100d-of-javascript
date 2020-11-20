const canvas=document.createElement('canvas')
canvas.width=501;
canvas.height=501;
canvas.style.backgroundColor='#e2434b';
canvas.style.borderRadius='15px'
const context=canvas.getContext('2d')
document.body.appendChild(canvas)
context.fillStyle='#e2434b'
context.fillRect(20,225,3,10)
context.fill()

let ball={
  move:function(){
    context.clearRect(this.x,this.y,10,10)
    this.x+=this.sx;
    this.y+=this.sy;
    context.fillStyle='#fee9d7'
    context.fillRect(this.x,this.y,10,10)

    context.beginPath()
    context.lineWidth='2'
    context.moveTo(250,20)
    context.lineTo(250,480)
    context.strokeStyle='#fee9d7'
    context.stroke()


    if(this.x>canvas.width || this.x<0){
      if(this.x<0){players.bot.score+=1}
      if(this.x>canvas.width){players.one.score+=1}
      players.restart()
    }

    if((players.one.x<=this.x && this.x<=players.one.x+8 && players.one.y-5<=this.y && this.y<=players.one.y+60+5)
    ||
    (players.bot.x-8<=this.x && this.x<=players.bot.x && players.bot.y-5<=this.y && this.y<=players.bot.y+60+5)){
      this.sx*=-1}
    if(this.y +10>canvas.height || this.y-10<0) {this.sy*=-1}
    players.one.move()
    players.bot.move()
    document.querySelector('.bot-score').textContent=`Bot Score : ${players.bot.score}`
    document.querySelector('.player-score').textContent=`Player Score : ${players.one.score}`
    requestAnimationFrame(ball.move.bind(this))
  },
  x:252,
  y:252,
  sx:-2,
  sy:-2
}

let players={
  one:{
    score:0,
    x:22,
    y:225,
    move(direction){
      context.clearRect(this.x,this.y,8,60)
      if(direction==='up'){this.y-=30}
      if(direction==='down'){this.y+=30}
      if(this.y<0){this.y=0}
      if(this.y+60>canvas.height){this.y=canvas.height-60}
      context.fillStyle='#fee9d7'
      context.fillRect(this.x,this.y,8,60)
    }
  },
  bot:{
    score:0,
    x:canvas.width-(22+8),
    y:225,
    move(){
      context.clearRect(this.x,this.y,8,60)
      if((this.y+30<=ball.y && ball.y<=this.y+60)
      ||
      (this.y-30<=ball.y && ball.y<=this.y)){
        let movement=Math.sign(ball.y-this.y)
        this.y+=(movement*30);
      }
      if(this.y<0){this.y=0}
      if(this.y+60>canvas.height){this.y=canvas.height-60}
      context.fillStyle='#fee9d7'
      context.fillRect(this.x,this.y,8,60)
    }
  },
  restart(){
    context.clearRect(0,0,canvas.width,canvas.height)
    players.one.x=22;
    players.bot.x=canvas.width-(22+8);
    players.one.y=225;
    players.bot.y=225;
    context.fillStyle='#fee9d7'
    context.fillRect(players.one.x,players.one.y,8,60)
    context.fillRect(players.bot.x,players.bot.y,8,60)
    ball.x=252;
    ball.y=252;
  }
}

document.onkeydown=(e)=>{
  switch (e.code) {
    case 'ArrowUp':
      players.one.move('up')
      break;
    case 'ArrowDown':
      players.one.move('down')
    break;
  }
}
ball.move()

