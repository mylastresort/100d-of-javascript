let themes=document.getElementById('themes')
let themesArea=document.querySelector('.themes-area')
let name=document.querySelector('.name')


var defaultB=undefined;
var defaultCase=undefined;

themes.addEventListener('mouseover',(e)=>{
  if(e.target.localName==='span'){
    name.textContent=e.target.id;
    console.log(e);
    defaultB=document.body.style.backgroundColor;
    defaultCase=themesArea.classList.value.slice(-2)
    console.log(defaultCase);
    themesArea.classList.remove(defaultCase)
    document.body.style.backgroundColor=e.target.style.backgroundColor;
    themesArea.classList.add(e.target.textContent)
  }
})
