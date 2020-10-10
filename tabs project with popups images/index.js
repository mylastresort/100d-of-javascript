let All= document.querySelector('.tabs #All');
    MrRobot= document.querySelector('.tabs #MrRobot');
    StrangerThings= document.querySelector('.tabs #Stranger');
    TheGoodDoctor= document.querySelector('.tabs #Doctor');
    DesignatedSurvivor= document.querySelector('.tabs #Survivor');
    Daredevil= document.querySelector('.tabs #Daredevil');
    TheFlash= document.querySelector('.tabs #Flash');
    IronFist= document.querySelector('.tabs #Iron');
    Deadpool= document.querySelector('.tabs #Deadpool');
    ThePunisher= document.querySelector('.tabs #Punisher');
    Sense= document.querySelector('.tabs #Sense');
    ManhuntUnabomber= document.querySelector('.tabs #Manhunt');
    DCs= document.querySelector('.tabs #DCs');
let Mindhunter= document.querySelector('.tabs #Mindhunter');





//TODO: showing all items on the first display
//by creating an array of images of each subject
//by creating an img html elements with class name for each subjets
//using filter
//function to grab the items 


var album =new Array;
var i=0;
do{
    i++;
    var image=new Image();
    var dir=`src/Mr Robot/1 (`+i+`).jpg`;
    image.src=dir;
    album.push(dir);
    
} while (image.width!==0);
console.log(album)



for (w=0;w<i;w++){
    var myImage=new Image();
    myImage.src=album[w];
    document.getElementById('galery').appendChild(myImage);
}