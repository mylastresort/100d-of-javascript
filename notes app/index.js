var notes =localStorage.getItem('notes');

var shown=false;

if(notes){
  var grids=JSON.parse(notes)
}else{
  var notes =new Array;
  var notes= JSON.stringify(notes)
  localStorage.setItem('notes',notes)
}

let add =document.getElementById('add');

let typeArea=document.getElementById('typeArea');

add.onclick=()=>{
  plus()
}

function plus(){
  if(typeArea.value){
    var value =typeArea.value;
    notes=JSON.parse(notes);
    notes.push(value);
    notes=JSON.stringify(notes);
    localStorage.setItem('notes',notes);
    grids=JSON.parse(notes)
  }
  this.show(); //first time i use it lol!!
}

let section=document.querySelector(".section");

(function show(){
  let appear=function (){
    if(!shown){
      for (const i in grids){
        var element=document.createElement('div');
        section.appendChild(element);
        element.textContent=grids[i];
        element.classList="notes";
      }
      shown=true;
    }else{
      var last=grids.length-1;
      var element=document.createElement('div');
      section.appendChild(element);
      element.textContent=grids[last];
      element.classList="notes";
    }
  }
  appear()
  window.show=appear;
})();