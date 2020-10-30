let words=document.getElementById('type-area');
let typing=document.getElementById('words')

const text = "Then came the night of the first falling star It was seen early in the morning rushing over Winchester eastward a line of flame high in the atmosphere Hundreds must have seen it and taken it for an ordinary falling star It seemed that it fell to earth about one hundred miles east of him";            //the paragraph to fetch
let textSplited= text.split(' ')          //count the words on the paragraph (output:9 elements)

for (const e in textSplited){     //create divs for N words
  const newDiv=document.createElement('div');
  newDiv.classList='app';
  newDiv.setAttribute('id',`div${e}`);
  words.appendChild(newDiv);
  for(const i of textSplited[e]){
    let letterElement=document.createElement('span');
    letterElement.classList='normal';
    let newLetter=document.createTextNode(i)
    letterElement.appendChild(newLetter)
    newDiv.appendChild(letterElement)
  }
}


document.getElementById(`div0`).style.borderBottom="#646669 2.5px solid";


let controls={
  counter:0,
  next:function(){
    if(this.counter>0){
      document.getElementById(`div${this.counter-1}`).style.borderBottom='';
    }
    document.getElementById(`div${this.counter}`).style.borderBottom="#646669 2.5px solid";
    return textSplited[this.counter]
  },
  prev:function(){
    document.getElementById(`div${this.counter+1}`).style.borderBottom='';
    document.getElementById(`div${this.counter}`).style.borderBottom="#646669 2.5px solid";
    return textSplited[this.counter]
  }
  ,
  position:function(){
    return document.getElementById(`div${this.counter}`).childNodes
  }
  ,
  spanPosition:function(){
    return document.getElementById(`div${this.counter}`)
  }
}  






typing.onkeydown=(e)=>{
  // if(app.bug){
  //   app.bug=false;
  //   return e.code=false;
  // }
  switch(e.code){
    case 'Enter':
      return false;
    case 'ArrowLeft':
      return false;
    case'ArrowUp':
      return false;
    case 'ArrowDown':
      return false;
    case 'ArrowRight':
      return false;
    case'Backspace':
      if(!app.bug){
        app.bug=true;
        if (typing.value!=='' && app.wordHistory.size!==0){
          const last =app.wordHistory.get(controls.counter).size-1;
          app.wordHistory.get(controls.counter).get(last).clean();
        }else {
          controls.counter=controls.counter-1;
          controls.prev()
          typing.value=`${app.inputs.get(controls.counter)} `;
        }
        app.bug=false;
        return;
      }else{
        return false;
      }
    case 'Space':
      setTimeout(()=>{
        controls.counter=controls.counter+1;
        controls.next()
        typing.value='';
      },50)
      return false;
    }
}





typing.onkeyup=()=>{
  app.inputs.set(controls.counter,typing.value)
  check();
}



function check(){
  const input=app.inputs.get(controls.counter);
  const nextWord=controls.next();
  let spanPosition=controls.position();

  if(input===nextWord){
    spanPosition.forEach((e)=>{e.classList='true'})
    app.wordHistory.clear();    //clear the items once the word is totally right 
    app.inputs.clear()
  }
  else if(input.length>nextWord.length){
    let uncorrectedLetters=input.slice(nextWord.length,input.length)
    for (var i in uncorrectedLetters){
      var i=JSON.parse(i);
      if(i>=uncorrectedLetters.length-1 || uncorrectedLetters.length===1){
        app.history('',uncorrectedLetters[i],input.length-1,controls.counter);
        app.fix(controls.counter,input.length-1)
      }
    }
    // if(uncorrectedLetters.length===3){
    //   app.bug=true;
    // }
  }
  else{
    //app.bug=false;
    for(var i in input){
      var  i=JSON.parse(i);
      if(nextWord[i]===input[i] && spanPosition[i].classList=='normal'){
        if(input.length===1){
          app.history(nextWord[i],input[i],i,controls.counter,nextWord);
          app.wordHistory.get(controls.counter).get(i).showRight();
        } 
        else{
          app.history(nextWord[i],input[i],i,controls.counter,nextWord);
          app.wordHistory.get(controls.counter).get(i).showRight();  
        }  
      }else if(nextWord[i]!==input[i]){
        app.history(nextWord[i],input[i],i,controls.counter,nextWord);
        app.wordHistory.get(controls.counter).get(i).showWrong();
      }  
    }  
  }  
}  


///I did this just to deal with prototypes and the map() constructor

var app={
  history:function(right,wrong,index,wordIndex){
    if(this.wordHistory.has(wordIndex)){
      this.wordHistory.get(wordIndex).set(index,new app.save(right,wrong,index,wordIndex))
    }
    else if(this.wordHistory.get(wordIndex)===undefined){
      this.wordHistory.set(wordIndex,new Map())
      this.wordHistory.get(wordIndex).set(index,new app.save(right,wrong,index,wordIndex))
    }
    else{
      this.wordHistory.set(wordIndex,new Map())
    }
  },bug:false
  ,
  fix:function(indexWord,index){
    let falseLetters=document.createElement('span');
    falseLetters.classList='fix';
    let letter=this.wordHistory.get(indexWord).get(index).wrong;
    let newLetter=document.createTextNode(letter);
    falseLetters.appendChild(newLetter);
    let spanPosition=controls.spanPosition()
    spanPosition.appendChild(falseLetters)
  }  
  ,
  wordHistory:new Map()
  ,
  save:function(right,wrong,index,wordIndex){
    this.right=right;
    this.wrong=wrong;
    this.index=index;
    this.wordIndex=wordIndex;
  }  
  ,
  inputs:new Map()
}




app.save.prototype.clean=function(){
  if(controls.position()[this.index].classList==='fix'){
    controls.position()[this.index].remove()
  }else{
    controls.position()[this.index].textContent=this.right;
    controls.position()[this.index].classList='normal'
  }
  app.wordHistory.get(controls.counter).delete(this.wordIndex)
}

app.save.prototype.showWrong=function(){
  controls.position()[this.index].textContent=this.wrong;
  controls.position()[this.index].classList='false'
}
app.save.prototype.showRight=function(){
  controls.position()[this.index].textContent=this.right;
  controls.position()[this.index].classList='true'
}