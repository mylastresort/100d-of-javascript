let section=document.querySelector(".notes-section");
let add =document.getElementById('add');
let typeArea=document.getElementById('typeArea');
let iptcolor=document.getElementById('color')
let iptsize=document.getElementById('select')
iptsize.onchange=()=>{
  typeArea.style.fontSize=iptsize.value
}
iptcolor.onchange=()=>{
  typeArea.style.color=iptcolor.value
}
let notes=()=>{
  if(!localStorage.getItem('notes') || localStorage.getItem('notes')==="[]"){
    return [];
  }else{
    return JSON.parse(localStorage.getItem('notes'))
  }
}
function Note(id,text,color,size){
  this.id=id;
  this.text=text;
  this.color=color;
  this.size=size;
}
function save(){
  if(!!typeArea.value){
    let notesUpdated=notes()
    let index=notes().length
    notesUpdated.push(new Note(index,typeArea.value,typeArea.style.color,typeArea.style.fontSize))
    localStorage.setItem('notes',JSON.stringify(notesUpdated))
  }
  let newNotesArray=notes().slice(section.childNodes.length)
  show(newNotesArray)
}

function show(listOfNotes){
  listOfNotes.map((i)=>{
    let element=document.createElement('div')
    let elementtxt=document.createTextNode(i.text)
    element.appendChild(elementtxt)
    element.style.fontSize=i.size;
    element.style.color=i.color;
    element.setAttribute('id',i.id)
    element.classList='notes'
    let deletebtn=document.createElement('button')
    deletebtn.setAttribute('style', 'left: 94%; border-radius:30%; color:darkslategrey; position: absolute; width: 1.5vw; height: 2.5vh; font-size: 18px; background-color: #add8e654; outline: none; border: 0px; box-shadow: #add8e654 0px 0px 2px 3px;')
    deletebtn.textContent='x';
    deletebtn.setAttribute('onclick','deleteNote(this)')
    element.appendChild(deletebtn)

    section.appendChild(element)
  })
}

window.onload=()=>{
  show(notes())
}

function deleteNote(e){
  let noteIndex=parseInt(e.parentNode.id);
  let notesUpdated=notes()
  if(noteIndex===notesUpdated.length-1){
    notesUpdated.pop()
  }else{
    notesUpdated.splice(noteIndex,1)
  }
  localStorage.setItem('notes',JSON.stringify(notesUpdated))
  e.parentNode.remove()
}
