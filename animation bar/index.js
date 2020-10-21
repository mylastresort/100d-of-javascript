let progress=document.querySelector('.progress-bar-fill');
let pers=document.querySelector('.progress-bar-text');

var counter=0;
const loading=setInterval(()=>{
    if(this.counter!==101){
        progress.style.width=`${this.counter}%`;
        this.counter++;
        pers.textContent=progress.style.width;
    }else{
        clearInterval(loading);
    }
},50)