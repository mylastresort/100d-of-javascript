let audio=document.getElementById('current-song');
let next=document.getElementById('next');
let prev=document.getElementById('prev');
let playPause=document.getElementById('playPause');
let artCover=document.getElementById('cover');
let songName=document.querySelector('.songName');
let artist=document.querySelector('.artist')
let songAlbum=document.querySelector('.songAlbum');
let songDuration=document.querySelector('.songDuration');
let timeSpent=document.querySelector('#time-spent')


//defining the params
let l=songs.length;
let nL =l-1;

//index of the current song
let v=0;
var artCoverSrc="songs/covers/"+songs[0].artist+" - "+songs[0].name+".jpg";
artCover.setAttribute("src",artCoverSrc)
let sound=false;
let volumemuted=null;
generate(v)
function decreaseVolume() {
  audio.volume -= 0.25;
}

function increaseVolume() {
  audio.volume += 0.25;
}

let volumeControl = document.querySelector(".volumeControl");
volumeControl.addEventListener("click", function() {
  if (audio.volume) {
    volumemuted=audio.volume;
    audio.volume = 0;
    document.querySelector('.volumeControl').classList = "fas volumeControl fa-volume-mute";
  } else {
    audio.volume = volumemuted;
    document.querySelector('.volumeControl').classList = "fas volumeControl fa-volume-up";
  }
});

function nextFunction(){
    switch (v) {
        //max is the first song
        case nL:
            v=0;
            return 0;
        //v between the min which is 0 and the max
        default:
            v++;
            return v;
    }
}
function prevFunction(){
  switch (v) {
      case 0:
        v=nL;
        return nL;
      //max is the first song
      case nL:
          v--;
          return v;
      //v between the min which is 0 and the max
      default:
          v--;
          return v;
  }
}
//generating the next/prev song
function generate(x) {
  var i=x;
  var source="songs/"+songs[i].artist+" - "+songs[i].name+".mp3";
  audio.setAttribute("src",source)
  var artCoverSrc="songs/covers/"+songs[i].artist+" - "+songs[i].name+".jpg";
  artCover.setAttribute("src",artCoverSrc)
  songName.textContent=songs[i].name;
  songAlbum.textContent=songs[i].album;
  artist.textContent=songs[i].artist;
}

function playSong(e) {
  if(sound){
    generate(e)
    audio.play();
    sound=true;
  }
  else{
    generate(e)
  }  
}
function pausingPlaying() {
  if(!sound){
    audio.play();
    sound=true;
  }
  else{
    audio.pause();
    sound=false;
  }
}
//the play/pause button
playPause.onclick=function(){
  pausingPlaying()
  checksound()
}
//the next button
next.onclick=function(){
  playSong(nextFunction())
  checksound()
}
//the previous button
prev.onclick=function(){
  playSong(prevFunction())
  checksound()
}
//autoplaying the next song
audio.addEventListener('ended',()=>{
  playSong(nextFunction())
  checksound()
})



audio.onloadeddata=function(){
  let min=Math.floor(audio.duration/60);
  let sec=Math.floor(audio.duration % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  songDuration.textContent=min+":"+sec;
  
}
audio.ontimeupdate=function(){
  let left=Math.floor(audio.currentTime);
  let min=Math.floor(left/60);
  let sec=left % 60;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  timeSpent.innerHTML=`${min}:${sec}`;
}

function checksound(){
  let icon=document.querySelector('.fa-play') || document.querySelector('.fa-pause')
  if(!sound){
    icon.classList='fas fa-play'
  }
  if(sound){
    icon.classList='fas fa-pause'
  }
}

function favsSongs(){
  if(!JSON.parse(localStorage.getItem('favs')) || localStorage.getItem('favs')===""){
    var favs=new Array()
  }else{
    var favs=JSON.parse(localStorage.getItem('favs'))
  }
  favs.push({name:songName.textContent,artist:artist.textContent})
  console.log(favs);
  localStorage.setItem('favs',JSON.stringify(favs))
}
