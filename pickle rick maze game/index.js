//unfortunately at the end, unlike the other challenges, i decided to take a look at the maze algorithms on wikipidea :(


let app={
  generate:()=>{
    let choises=[
      [app.x()+50,app.y()],
      [app.x()-50,app.y()],
      [app.x(),app.y()+50],
      [app.x(),app.y()-50]
    ].filter(e=>(
        500>e[0] 
        && e[0]>=0 
        && 500>e[1] 
        && e[1]>=0
        && (!app.tracker.some(_=>(_[0]===e[0] && _[1]===e[1])))))
    if(!!choises.length){
      let chosen=choises[Math.floor(Math.random()*(choises.length))]
      let direction=(app.x()>chosen[0])?'left'
                    :(app.x()<chosen[0])?'right'
                    :(app.y()>chosen[1])?'up'
                    :'down';
      switch (direction) {
        case 'right':
          context.clearRect(chosen[0]-3,chosen[1]+1,48,48)
          break;
        case 'left':
          context.clearRect(chosen[0]+3,chosen[1]+1,48,48)
          break;
        case 'up':
          context.clearRect(chosen[0]+1,chosen[1]+3,48,48)
          break;
        case 'down':
          context.clearRect(chosen[0]+1,chosen[1]-3,48,48)
          break;
      }
      app.history.push(chosen)
      app.tracker.push(chosen)
      app.directions.set(`${chosen}`,direction)
      context.fillStyle='purple'
      context.fillRect(chosen[0]+5,chosen[1]+5,40,40)
    }else{
      app.history.pop()
    }

  },
  x:()=>{return app.history.slice(-1)[0][0]},
  y:()=>{return app.history.slice(-1)[0][1]},
  history:new Array([0,0]),       //for the path
  tracker:new Array([0,0]),        //storing the visited squares
  directions:new Map()            //storing the last directions
}

const canvas=document.createElement('canvas')
canvas.width=501;
canvas.height=501;
canvas.style.backgroundColor='whitesmoke';
canvas.style.display='block'
canvas.style.margin='0 auto'
canvas.style.marginTop='9%'
const context=canvas.getContext('2d')
document.body.appendChild(canvas)

let img=document.getElementById('image')
context.drawImage(img,app.x(),app.y(),45,45)

for (let i = 0; i < 551; i+=50) {
  context.moveTo(0,i)
  context.lineWidth='1'
  context.lineTo(canvas.width,i)
  context.stroke()
}
for (let i = 0; i < 551; i+=50) {
  context.moveTo(i,0)
  context.lineWidth='1'
  context.lineTo(i,canvas.height)
  context.stroke()
}


//for animation
let go=setInterval(() => {
  app.generate()
  if(!app.history.length){clearInterval(go)}
  context.clearRect(app.x()+5,app.y()+5,40,40)
},15);


// while(!!app.history.length){
//   app.generate()
//   context.clearRect(app.x()+5,app.y()+5,40,40)
// }

let player={
  x:()=>{return app.history.slice(-1)[0][0]},
  y:()=>{return app.history.slice(-1)[0][1]},
  lastInput:new Map()             //storing the movements of the player with the index of the case
}

document.onkeydown=e=>{

  switch (e.code) {
    case 'ArrowUp':
      positition=app.directions.get(`${player.x()},${player.y()-50}`)
      ///search the direction 
      break;
    case 'ArrowDown':
      positition=app.directions.get(`${player.x()},${player.y()+50}`)
      break;
    case 'ArrowRight':
      positition=app.directions.get(`${player.x()+50},${player.y()}`)
      if(positition==='right'){
        //move to the right
      }else if(player.lastInput==='left'){
        //move to the right
      }
      break;
    case 'ArrowLeft':
      positition=app.directions.get(`${player.x()-50},${player.y()}`)
      break;
  }
}