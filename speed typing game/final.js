//elements on the document
var words=document.getElementById('type-area');
var typing=document.getElementById('words')
//the paragraph to fetch
var text="Dave found joy in the daily routine of life He awoke at the same time ate the same breakfast and drove the same commute He worked at a job that never seemed to change and he got home sharp every night It was who he had been for the last ten years and he had no idea that was all about to change";
//count the words on the paragraph
var newText= text.split(' ')//output: 9 elements
//show the words on the front-page
///create divs for N words 
for (const e in newText){
  var neww=document.createElement('div');
  neww.classList='app';
  neww.setAttribute('id',`div${e}`);
  words.appendChild(neww);
}
///push the letters to each word's div
v=0;
for (const i of text){
  if(i===" "){
    v++;
    continue;
  }
  target=document.getElementById(`div${v}`);
  var newe=document.createElement('span')
  newe.classList='normal'
  var letter=document.createTextNode(i)
  newe.appendChild(letter)
  target.appendChild(newe)
}
counter=0;
nextWord=newText[counter]

word1=document.getElementById(`div${counter}`).childNodes
word2=document.getElementById(`div${counter}`)
///block the enter and the arrows!!!





typing.onkeyup=(e)=>{
  if(e.code==="Backspace"){
    app.save.clean()
    app.wordHistory.pop()
  }else{
    check()
  }
}


function check(){
  var test=typing.value.split(' ').slice(-1)[0];
  if (test===nextWord){
    ///block it
    app.wordHistory=[];
    word2.lastChild.classList='true';
  }else if(test.length>nextWord.length){
    app.bug(test.length)//lets fix it untill the end
  }else{
    for(const i in test){
      console.log(i);
      if(nextWord[i]===test[i] && word1[i].classList=='normal'){
        if(test.length===1){
          app.history(nextWord[i],test[i],i);
          app.wordHistory[i].showRight();
        }else if(word1[i-1].classList==='false'){
          console.log('here');
          app.history(nextWord[i],test[i],i);
          app.wordHistory[i].showWrong();
        }else{
          app.history(nextWord[i],test[i],i);
          app.wordHistory[i].showRight();
        }
      }else if(nextWord[i]!==test[i]){
        app.history(nextWord[i],test[i],i);
        app.wordHistory[i].showWrong();
      }
    }
  }    
}




///i did this just to deal with prototypes and constrators

var app={
  history:function(right,wrong,index){
    if(app.wordHistory>index){
      this.wordHistory.push(new this.save(right,wrong,index));
    }
  },
  bug:function(spanPosition){
    var l=this.uncorrectedLetters.join('');
  },
  wordHistory:[],
  save:function(right,wrong,index){
    this.right=right;
    this.wrong=wrong;
    this.index=index;
  }
}


app.save.prototype.clean=function(){
  word1[this.index].textContent=this.right;
  word1[this.index].classList='normal'
}

app.save.prototype.showWrong=function(){
  word1[this.index].textContent=this.wrong;
  word1[this.index].classList='false'
}
app.save.prototype.showRight=function(){
  word1[this.index].textContent=this.right;
  word1[this.index].classList='true'
}