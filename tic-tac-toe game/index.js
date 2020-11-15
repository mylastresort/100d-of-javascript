const cases=document.querySelectorAll('.case')
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
//the grids must not be even otherwise some reversed lines will be missed while generating
let level={
  noob:{
    grids:3,
    required:3
  },
  easy:{
    grids:9,
    required:5
  },
  grab:function(){
    return this.easy.required
  }
}
let turn=0;

function generateMemory(grids,required){
  const diffrence=grids-required;
  //diffrence: to maitain every line/column possible if the user changed the number required cases to win
  for(let i=0;i<grids;i++){
    inputs.lines.set(`L${i}`,new Map())
    inputs.colomuns.set(`C${i}`,new Map())
  }
  for(let i=0;i<diffrence+1;i++){
    for(let p=0;p<grids;p++){
      inputs.lines.get(`L${p}`).set(i,[])
      inputs.colomuns.get(`C${p}`).set(i,[])
    }
  }
  inputs.reverseL.set(`Rl0`,new Map())
  inputs.reverseR.set(`Rr0`,new Map())
  for (let i=0;i<(grids-required)*2;i++){
    inputs.reverseL.set(`Rl${i+1}`,new Map())
    inputs.reverseR.set(`Rr${i+1}`,new Map())
  }
  for (let i=0;i<grids-required+1;i++){
    inputs.reverseL.get(`Rl0`).set(i,[])
    inputs.reverseR.get(`Rr0`).set(i,[])
  }
  let l=grids-required;
  let equation=grids-required
  for(let i=0;i<l;i++){
    for(let p=0;p<equation;p++){
      inputs.reverseL.get(`Rl${i+1}`).set(p,[])
      inputs.reverseR.get(`Rr${i+1}`).set(p,[])
    }
    equation--;
  }
  equation=grids-required
  for(let i=l;i<l*2;i++){
    for(let p=0;p<equation;p++){
      inputs.reverseL.get(`Rl${i+1}`).set(p,[])
      inputs.reverseR.get(`Rr${i+1}`).set(p,[])
    }
    equation--;
  }
}


generateMemory(level.easy.grids, level.easy.required)
generate(level.easy.grids, level.easy.required)

function play(element){

  const required=level.grab()

  if(element.children.length>0){return false};
  const index=Math.floor(Math.random() * 3 )
  let player=null;
  const img=document.createElement('img')
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
  const id=element.getAttribute('case-key')
  element.appendChild(img)
  const colomun=id.split('-')[0]
  const line=id.split('-')[1]
  const Rel=id.split('-')[2]
  const Rer=id.split('-')[3]
  const nColomun=parseInt(colomun[1])
  const nLine=parseInt(line[1])
  const nRel=parseInt(Rel[4])
  const nRer=parseInt(Rer[4])
  const lineRel=Rel.slice(0,3)
  const lineRer=Rer.slice(0,3)
  ///assuming that this input is the last element on a line (line:lines i made on inputs object)
  //get the start case possible on inputs objects (in case for lines:we grab it from the colomun) and it must not be negative 
  let key=nColomun-required+1
  //for Lines
  if(key<0){
    key=0
  }
  //pushing the input starting from line 'key' on inputs
  ///example:if the nColomun is C2 and the required is 3 then the start is C0, the end is C[nColomun]
  for(let d=key;d<nColomun+1;d++){
    if(inputs.lines.get(line).get(d)!==undefined){
      inputs.lines.get(line).get(d).push(player)
    }
  }
  //////same for Colomuns
  key=nLine-required+1
  if(key<0){
    key=0
  }
  //pushing the input starting from line 'key' on inputs
  for(let d=key;d<nLine+1;d++){
    if(inputs.colomuns.get(colomun).get(d)!==undefined){
      inputs.colomuns.get(colomun).get(d).push(player)
    }
  }
  //////for reversed lines (leftside)
  if(Rel!=='no'){
    key=nRel-required+1
    if(key<0){
      key=0
    }
    //pushing the input starting from line 'key' on inputs
    for (let d=key;d<nRel+1;d++){
      if(inputs.reverseL.get(lineRel).get(d)!==undefined){
        inputs.reverseL.get(lineRel).get(d).push(player)
      }
    }
  }
  ///////for reversed lines (rightside)
  if(Rer!=='no'){
    key=nRer-required+1
    if(key<0){
      key=0
    }
    //pushing the input starting from line 'key' on inputs
    for(let d=key;d<nRer+1;d++){
      if(inputs.reverseR.get(lineRer).get(d)!==undefined){
        inputs.reverseR.get(lineRer).get(d).push(player)
      }
    }
  }
  setTimeout(() => {
    check()
  }, 50);
}

function check(){
  inputs.colomuns.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===level.grab()){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===level.grab()){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
  inputs.lines.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===level.grab()){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===level.grab()){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
  inputs.reverseL.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===level.grab()){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===level.grab()){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
  inputs.reverseR.forEach((e,line)=>{
    e.forEach((e,group)=>{
      if(e.length===level.grab()){
        if(e.every(e=>e=='x')){
          alert(`the X player won the game with line ${group} in ${line}`)
        }
        if(e.length===level.grab()){
          if(e.every(e=>e=='o')){
          alert(`the O player won the game with line ${group} in ${line}`)
          }
        }
      }
    })
  })
}


function generate(gridsCases,requiredCases){
  let deadline=0;
  let reversed=new Map()
  for (let i=0;i<gridsCases;i++) {reversed.set(`L${i}`,new Array())}
  const diffrence=gridsCases-requiredCases+1;
  while(deadline<Math.pow(gridsCases,2)){
    let key=new Array();       //lines,colomuns,left reversed lines
    let c=`C${deadline%gridsCases}`;
    let l=`L${Math.floor(deadline/gridsCases)}`;
    key.push(c)
    key.push(l)
    c=parseInt(c.slice(1))
    l=parseInt(l.slice(1))
    if(c>=l &&  c-l<diffrence){
      rl=`Rl${c-l}'${l}`;
    }else if(c<l  &&  l-c<diffrence){
      rl=`Rl${l-c+diffrence-1}'${c}`;
    }else{
      rl='no'
    }
    reversed.get(`L${l}`).push(rl.slice(2))
    key.push(rl)
    let result=key.join('-');
    let element=document.createElement('span')
    element.setAttribute('case-key',result)
    element.classList='case'
    element.setAttribute('onclick','play(this)')
    document.body.querySelector('.app').appendChild(element)
    deadline++;
  }
  ///for rr im gonna add the reversed arrays on the rr Map
  let b=document.querySelectorAll('.case')
  reversed.forEach(e=>e.reverse())
  let counter=0;
  b.forEach(e=>{
    let result=e.getAttribute('case-key');
    let index=result.slice(4)[0]
    let rr=reversed.get(`L${index}`)[counter]
    rr==='' ? result+='-no': result+=`-Rr${rr}`;
    e.setAttribute('case-key',result)
    counter=(gridsCases-1===counter)? 0 : counter+1;
  })
  document.getElementById('app').style.gridTemplateColumns=`repeat(${gridsCases},1fr)`
  document.getElementById('app').style.gridTemplateRows=`repeat(${gridsCases},1fr)`
  // b.forEach(e=>e.textContent=e.getAttribute('case-key'))
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