////showing a message: i'll show no mercy, you're okay with that?
const xo={
  x:['o0.png','o1.png','o2.png'],
  o:['x0.png','x1.png','x2.png']
}
const inputs={
  lines:new Map(),
  colomuns:new Map(),
  reverse:new Map()
}

let noob=[3,3]
let easy=[7,3]      ///the first one means X*X grids, the second refer to how much Os/Xs is required to win

let var1=easy[0]
let var2=easy[1]


let turn=0;

const cases=document.querySelectorAll('.case')




function dmeass(var1,var2){
  const n=var1-var2;    ///to maitain every line/column possible if the user changed the number required cases to win
  for(let i=0;i<var1*(n+1);i++){
    inputs.lines.set(i,new Map())
    inputs.colomuns.set(i,new Map())
  }
  for(const e=0;e<2;e++){
    let left= var1-1;
    while(left>=var2){
      let equation=((left-var2+1)*2);
      for(const o=0;o<equation;o++){
        inputs.reverse.set(inputs.reverse.size,new Map())
      }
      left--;
    }
  }
  for(const i=0;i<2;i++){
    let left=var1-1;
    let equation=left-var2;
    let key=equation+1;
    for(const o=0;o<key;o++){
      inputs.reverse.set(inputs.reverse.size,new Map())
    }
  }
}


let chosengrid=var1;

let chosenlvl=var2;




///inverse: the total of all the ones that are next to inverse
var2=================================================================================================>var1
(3=var2=>(1)*2;4=var2+1=>(1+1)*2;5=var2+2=>(1+1+1)*2;6=var2+3=>((var1-1)-var2+1)*2;//7=var2+4=>1+1+1+1+1)*2
(4=4=>1+inverse;5=4+1=>1+1+inverse;6=4+2=>1+1+1+inverse;//7=4+3=>1+1+1+1)*2
(5=5=>1+inverse;6=5+1=>1+1+inverse;//7=5+2=>1+1+1)*2
(6=6=>1+inverse;//7=6+1=>1+1)*2
//(7=7=>1)*2

























function play(element){
  let index=Math.floor(Math.random() * 3 )
  if(!turn){
    const source=Object.values(xo)[1][index]
  }else{
    const source=Object.values(xo)[0][index]
  }


  let img=document.createElement('img')
  img.setAttribute('src',source)

  const id=element.id
  element.appendChild(img)



}















////to make a demo
let i=0
do {
  let index=Math.floor(Math.random() * 3 )
  let xOro=Math.floor(Math.random()*2)
  let item=Object.values(xo)[xOro][index]
  let img=document.createElement('img')
  img.setAttribute('src',item)
  cases[i].appendChild(img)
  i++;
  var exist=cases[i]
} while (exist);