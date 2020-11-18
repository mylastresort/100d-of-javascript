const canvas=document.createElement('canvas')
canvas.width=501;
canvas.height=501;
canvas.style.backgroundColor='#e2434b';
canvas.style.borderRadius='15px'
canvas.style.display='block'
canvas.style.margin='0 auto'
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

    if(this.x===players.one.x+8 && players.one.y-10<=this.y && this.y<=players.one.y+40+10 ){
      this.sx*=-1}
    if(this.x+10>canvas.width){this.sx*=-1}
    if(this.y +10>canvas.height || this.y-10<0) {this.sy*=-1}

    requestAnimationFrame(ball.move.bind(this))
  },
  x:252,
  y:252,
  sx:-2,
  sy:-2
}

let players={
  one:{
    x:22,
    y:225,
    move:function(direction){
      context.clearRect(this.x,this.y,8,40)
      if(direction==='up'){this.y-=40}
      if(direction==='down'){this.y+=40}
      if(this.y<0){this.y=0}
      if(this.y+40>canvas.height){this.y=canvas.height-40}
      context.fillStyle='#fee9d7'
      context.fillRect(this.x,this.y,8,40)
    }
  }
}
context.fillStyle='#fee9d7'
context.fillRect(players.one.x,players.one.y,8,40)

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

