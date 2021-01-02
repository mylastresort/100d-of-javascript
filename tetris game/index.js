const canvas=document.querySelector('canvas')
const context=canvas.getContext('2d')


const game={
  cube:{
    size:19,
    margin:2,
    get offsetStart(){return canvas.width*0.005},
    get offsetEnd(){return (canvas.width*0.6)-this.size}
  },
}

context.beginPath()
context.moveTo(canvas.width*0.6,0)
context.lineTo(canvas.width*0.6,canvas.height)
context.strokeStyle='#4e413b80';
context.lineWidth='5'
context.stroke()



// for(
//   let x=canvas.width*0.005;
//   x<(canvas.width*0.6)-game.cube.size;
//   x+=(game.cube.size+game.cube.margin)
//   ){
//   context.fillStyle='#ff6d24'
//   context.fillRect(x,40,game.cube.size,game.cube.size)
// }



class Tetrominoe {
  constructor(right, left, up, down) {
    this.right = right
    this.left = left
    this.up = up
    this.down = down
  }
}


