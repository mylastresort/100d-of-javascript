let canvas=document.querySelector('canvas')
let context=canvas.getContext('2d')


const game={
  restart(){
    this.paddle.x=Math.floor(canvas.width/2)-(this.paddle.size.w/2)
    this.ball.y=canvas.height-(5+game.paddle.size.h+this.ball.size)
    this.ball.x=this.paddle.x+(this.paddle.size.w/2)
    this.ball.make()
    context.fillStyle='#ffd460'
    context.fillRect(this.paddle.x,this.paddle.y,this.paddle.size.w,this.paddle.size.h)
    this.bricks.show()
    this.inGame=true;
  },
  ball:{
    size:15,
    make(){
      context.beginPath()
      context.arc(this.x,this.y,this.size,0,Math.PI*2)
      context.fillStyle='orange'
      context.fill()
    },
    x:null,
    y:null,
    move(){
      context.beginPath()
      context.clearRect(this.x-this.size,this.y-this.size,this.size*2,this.size*2)
      this.x+=game.speed*0.25;
      this.y-=game.speed*0.25;

      this.make()
      context.closePath()

      requestAnimationFrame(game.ball.move.bind(this))
    }
  },
  player:{},
  speed:20,
  paddle:{
    size:{
      w:100,
      h:14
    },
    get y(){return canvas.height-5-this.size.h},
    x:null
  },
  inGame:false,
  bricks:{
    list:new Array([],[]),
    show(){
      let brick=[80,20]
      let width=Math.floor(canvas.width-((35*canvas.width)/canvas.width))
      let height=Math.floor((25*canvas.height)/canvas.height)
      if(!game.inGame){
        for(let y=height;y<=Math.floor((150*canvas.height)/canvas.height);y+=(brick[1]+10)){
          this.list[0].push(y)
        }
        for(let x=canvas.width-width;x<=width;x+=(brick[0]+10)){
          this.list[1].push(x);
        }
      }
      for(const e in this.list[0]){
        for (const i in this.list[1]) {
          context.fillStyle='#cecece'
          context.fillRect(this.list[1][i],this.list[0][e],brick[0],brick[1])
        }
      }
      requestAnimationFrame(game.bricks.show.bind(this))
    }
  }
}




document.onkeydown=function move(e){
  context.clearRect(game.paddle.x,game.paddle.y,game.paddle.size.w,
    game.paddle.size.h)
    switch (e.code) {
      case 'ArrowLeft':
        game.paddle.x-=game.speed;
        break;
    case 'ArrowRight':
      game.paddle.x+=game.speed;
      break;
    default:
      //launch the game
      game.ball.move()
      break;
  }
  context.fillStyle='#ffd460'
  context.fillRect(game.paddle.x,game.paddle.y,game.paddle.size.w,game.paddle.size.h)
}
window.onload=()=>{game.restart()}

canvas.onmousemove=()=>{}