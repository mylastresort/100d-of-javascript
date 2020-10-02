var album=[
    "images/1 (1).jpg",
    "images/1 (2).jpg",
    "images/1 (3).jpg",
    "images/1 (4).jpg",
    "images/1 (5).jpg",
    "images/1 (6).jpg",
    "images/1 (7).jpg",
    "images/1 (8).jpg",
    "images/1 (9).jpg",
    "images/1 (10).jpg",
]

//the current image
var the_pic=0;
var image= document.getElementById('currentPic');

//the next button
document.getElementById('next').onclick=function(){
    the_pic++;
    if (the_pic>=album.length){
        the_pic=0;
    }
    //showing the img
    image.setAttribute("src", album[the_pic]);
}

//the previous button
document.getElementById('previous').onclick=function(){
    the_pic--;
    if (the_pic<0){
        the_pic=album.length-1;
    }
    //showing the img
    image.setAttribute("src", album[the_pic]);
}





//TODO://adding images

