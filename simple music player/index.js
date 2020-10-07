let audio=document.getElementById('current-song');
let next=document.getElementById('next');
let prev=document.getElementById('prev');
let playPause=document.getElementById('playPause');
let artCover=document.getElementById('cover');
let songName=document.querySelector('.songName');
let songAlbum=document.querySelector('.songAlbum');
let songDuration=document.querySelector('.songDuration');
let songMinutes=document.querySelector('.minutes');
let songSeconds=document.querySelector('.seconds');

//storing the songs into a variable
var songs = [
  {
    name: "Color Me Blue",
    album: "Color Me Blue",
    artist: "Akane",
    cover:"songs/covers/akane - Color Me Blue.jpg"
  },
  {
    name: "Toska",
    album: "Toska",
    artist: "Alina Yanovna",
    cover:"songs/covers/Alina Yanovna - Toska.jpg"
  },
  {
    name: "Musing",
    album: "Musing",
    artist: "Clara Nishimoto",
    cover:"songs/covers/Clara Nishimoto - Musing.jpg"
  },
  {
    name: "Lonely Children",
    album: "Lonely Children",
    artist: "Eik Octobre",
    cover:"songs/covers/Eik Octobre - Lonely Children.jpg"
  },
  {
    name: "Somewhere in Between",
    album: "Somewhere in Between",
    artist: "Jacob LaVallee",
    cover:"songs/covers/Jacob LaVallee - Somewhere in Between.jpg"
  },
  {
    name: "All The Little Things You Say",
    album: "All The Little Things You Say",
    artist: "Jef Martens",
    cover:"songs/covers/Jef Martens - All The Little Things You Say.jpg"
  },
  {
    name: "After The Silence",
    album: "After The Silence",
    artist: "Léon Branche",
    cover:"songs/covers/Léon Branche - After The Silence.jpg"
  },
  {
    name: "Lacrimosa",
    album: "Lacrimosa",
    artist: "Lucas Vendrai",
    cover:"songs/covers/Lucas Vendrai - Lacrimosa.jpg"
  },
  {
    name: "Silent Dusk",
    album: "Silent Dusk/ Beside The Spring",
    artist: "Olivia Belli",
    cover:"songs/covers/Olivia Belli - Silent Dusk.jpg"
  },
];
//defining the params
var l=songs.length;
var nL =l-1;

//index of the current song
var v=0;
var artCoverSrc="songs/covers/"+songs[0].artist+" - "+songs[0].name+".jpg";
artCover.setAttribute("src",artCoverSrc)
var sound=false;
generate(v)

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
  // calc_time()
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
}
//the next button
next.onclick=function(){
  playSong(nextFunction())
}
//the previous button
prev.onclick=function(){
  playSong(prevFunction())
}
//autoplaying the next song
audio.addEventListener('ended',()=>{
  playSong(nextFunction())
})

function calc_time(){
  var minutes =parseInt(audio.duration/60);
  var full_minutes=(audio.duration)/60;
  var full_seconds=full_minutes-minutes;
  var seconds=parseInt(full_seconds*60);
  songMinutes.textContent=minutes;
  songSeconds.textContent=seconds;
}



audio.onloadeddata=function(){
  calc_time()
}