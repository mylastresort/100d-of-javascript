////showing a message: i'll show no mercy, you're okay with that?
const xo={
  o:['o0.png','o1.png','o2.png'],
  x:['x0.png','x1.png','x2.png']
}
const inputs={
  lines:new Map(),
  colomuns:new Map(),
  reverseL:new Map(),
  reverseR:new Map()
}

let noob=[3,3]
let easy=[5,4]      ///the first one means X*X grids, the second refer to how much Os/Xs is required to win

let var1=easy[0]
let var2=easy[1]

let turn=0;

const cases=document.querySelectorAll('.case')

function dmeass(var1,var2){
  const n=var1-var2;
  //n: to maitain every line/column possible if the user changed the number required cases to win
  for(let i=0;i<var1;i++){
    inputs.lines.set(`L${i}`,new Map())
    inputs.colomuns.set(`C${i}`,new Map())
  }
  for(let p=0;p<n+1;p++){
    for(let i=0;i<var1;i++){
      inputs.lines.get(`L${i}`).set(p,[])
      inputs.colomuns.get(`C${i}`).set(p,[])
    }
  }
  inputs.reverseL.set(`Rl0`,new Map())
  inputs.reverseR.set(`Rr0`,new Map())
  for (let z=0;z<(var1-var2)*2;z++){
    inputs.reverseL.set(`Rl${z+1}`,new Map())
    inputs.reverseR.set(`Rr${z+1}`,new Map())
  }
  for (let f=0;f<var1-var2+1;f++){
    inputs.reverseL.get(`Rl0`).set(f,[])
    inputs.reverseR.get(`Rr0`).set(f,[])
  }
  let l=var1-var2;
  let equation=var1-var2
  for(let j=0;j<l;j++){
    for(let o=0;o<equation;o++){
      inputs.reverseL.get(`Rl${j+1}`).set(o,[])
      inputs.reverseR.get(`Rr${j+1}`).set(o,[])
    }
    equation--;
  }
  equation=var1-var2
  for(let g=l;g<l*2;g++){
    for(let o=0;o<equation;o++){
      inputs.reverseL.get(`Rl${g+1}`).set(o,[])
      inputs.reverseR.get(`Rr${g+1}`).set(o,[])
    }
    equation--;
  }
}


dmeass(var1,var2)



function play(element){
  if(element.children.length>0){return false};
  let index=Math.floor(Math.random() * 3 )
  let player=null;
  let img=document.createElement('img')
  switch (turn) {
    case 0:
      player='o'
      turn=1
      img.setAttribute('src',Object.values(xo)[0][index])
      break;
    case 1:
      player='x'
      turn=0
      img.setAttribute('src',Object.values(xo)[1][index])
      break;
  }
  const id=element.id
  element.appendChild(img)
  let colomun=id.split('-')[0]
  let line=id.split('-')[1]
  let Rel=id.split('-')[2]
  let Rer=id.split('-')[3]
  let nColomun=parseInt(id.split('-')[0][1])
  let nLine=parseInt(id.split('-')[1][1])
  let nRel=parseInt(id.split('-')[2][4])
  let nRer=parseInt(id.split('-')[3][4])
  let lineRel=Rel.slice(0,3)
  let lineRer=Rer.slice(0,3)
  ///assuming that this colomun its the last element on the line
  //get the start line created on inputs from the colomun and it must not be negative 
  //for Lines
  let key=nColomun-var2+1
  if(key<0){
    key=0
  }
  //pushing the input statring from line 'key' on inputs
  for(let d=key;d<nColomun+1;d++){
    if(inputs.lines.get(line).get(d)!==undefined){
      inputs.lines.get(line).get(d).push(player)
    }
  }
  //////same for Colomuns
  key=nLine-var2+1
  if(key<0){
    key=0
  }
  //pushing the input on line 'key'
  //////for reversed lines (leftside)
  for(let d=key;d<nLine+1;d++){
    if(inputs.colomuns.get(colomun).get(d)!==undefined){
      inputs.colomuns.get(colomun).get(d).push(player)
    }
  }
  if(Rel!=='no'){
    key=nRel-var2+1
    if(key<0){
      key=0
    }
    //pushing the input on line 'key'
  }
  for (let d=key;d<nRel+1;d++){
    if(inputs.reverseL.get(lineRel).get(d)!==undefined){
      inputs.reverseL.get(lineRel).get(d).push(player)
    }
  }
  ///////for reversed lines (rightside)
  if(Rer!=='no'){
    key=nRer-var2+1
    if(key<0){
      key=0
    }
    //pushing the input on line 'key'
    for(let d=key;d<nRer;d++){
      if(inputs.reverseR.get(lineRer).get(d)!==undefined){
        inputs.reverseR.get(lineRer).get(d).push(player)
      }
    }
  }


  check()
}

















function check(){
  inputs.colomuns.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===4){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===4){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
  inputs.lines.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===4){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===4){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
  inputs.reverseL.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===4){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===4){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
  inputs.reverseR.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===4){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===4){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
}




















// ////to make a demo
// let i=0
// do {
//   let index=Math.floor(Math.random() * 3 )
//   let xOro=Math.floor(Math.random()*2)
//   let item=Object.values(xo)[xOro][index]
//   let img=document.createElement('img')
//   img.setAttribute('src',item)
//   cases[i].appendChild(img)
//   i++;
//   var exist=cases[i]
// } while (exist);
