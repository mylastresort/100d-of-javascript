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

typing.onkeyup=(e)=>{if(e.code==="Backspace"){}else{check()}}


function check(){
  var test=typing.value.split(' ').slice(-1)[0];
  if (test===nextWord){
    word2.lastChild.classList='true';
    //console.log("word is totaly right");
  }else if(test.length>nextWord.length){
    failing.bug(test.length)//lets fix it untill the end
  }else{
    for (const i in test){
      //console.log(`im on the ${i} of i`);
      if(word1[i-1]===undefined && test.length===1 ){
        //console.log("the previous letter is not defined,im gonna assume this is the first letter,lets check it");
        if(nextWord[i]===test[i]){
          word1[i].classList='true'
          //console.log("letter is right");
        }else{
          //console.log("nop, did not match,its wrong");
          failing.uncorrectedLetters.push(test[i])
          failing.letterFailed.spanPosition=i;
          failing.letterFailed.letter=word1[i].textContent;

          word1[i].textContent=test[i];
          word1[i].classList='false'
        }
      }
      else if(i>0){
        //console.log("lets check the previous word");
        if(word1[i-1].classList==='false'){
          //console.log("the class is set to false");
          if(word1[i+1]===undefined){
            //console.log("it was your last letter");
          }else{
            //console.log("im gonna set this wrong due to the last one");
            word1[i+1].classList='false'
          }
        }else{
          //console.log("your previous letter might be wrong,otherwise lets check this check this one then");
          if(nextWord[i]===test[i]){
            //console.log("alright it matchs");
            word1[i].classList='true'
          }else{
            //console.log("nop, did not match,its wrong");
            failing.uncorrectedLetters.push(test[i])
            failing.letterFailed.spanPosition=i;
            failing.letterFailed.letter=word1[i].textContent;

            word1[i].textContent=test[i];
            word1[i].classList='false'
          }
        }
      }
    }    
  }
}


var failing={
  save:function(){},

  bug:function(spanPosition){
    var l=this.uncorrectedLetters.join('');
    },
  letterFailed:{
    spanPosition:undefined,
    letter:undefined
  },
  uncorrectedLetters:[]
}



