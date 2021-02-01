const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 550;

const game = {
  x:null,
  y:null,
  color:'purple',
  pics:[
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image1.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image2.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image3.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image4.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image5.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image6.png',
  ],
  drawing:false,
  chosenPic:0,
  raduis:10,
  draw(context, x1, y1, x2, y2){
    context.beginPath();
    context.drawImage(image,0,0,canvas.width,canvas.height);
    context.closePath();
    context.beginPath();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = this.color;
    context.lineWidth = this.raduis;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();

  },
  start(img) {
    context.clearRect(0,0,canvas.width,canvas.height);
    image = new Image();
    image.width = 100;
    image.height = 50;
    image.src = game.pics[img];
    image.onload = _ => {
      context.beginPath();
      context.drawImage(image,0,0,canvas.width,canvas.height);
      context.closePath();
    }
  }
}

canvas.onmousemove = _ => {
  if(game.drawing) {
    game.draw(context, game.x, game.y, _.offsetX, _.offsetY);
    game.x = _.offsetX;
    game.y = _.offsetY;
  }
}

canvas.onmousedown = _ => {
  game.x = _.offsetX;
  game.y = _.offsetY;
  game.drawing = true;
};

canvas.onmouseup = _ => {
  if (game.drawing) {
    game.draw(context, game.x, game.y, _.offsetX, _.offsetY);
    game.x = 0;
    game.y = 0;
    game.drawing = false;
  }
};


document.querySelector('.colors').onclick = _ => {
  if(_.target.localName == 'span') game.color = window.getComputedStyle(_.target).backgroundColor;
}


document.querySelector('.pics').onclick = _ => {
  if(_.target.localName == 'img') game.start(parseInt(_.target.id.slice(1)));
}

window.onload = _ => game.start(0)