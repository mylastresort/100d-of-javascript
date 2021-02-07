const canvas1 = document.querySelector('#canvas1');
const context1 = canvas1.getContext('2d');

const canvas2 = document.querySelector('#canvas2');
const context2 = canvas2.getContext('2d');

canvas1.width = 1000;
canvas1.height = 550;
canvas2.width = 1000;
canvas2.height = 550;

const game = {
  x: null,
  y: null,
  color: 'purple',
  pics: [
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image1.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image2.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image3.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image4.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image5.png',
    'https://www.cargamesonline.biz/html5/disney_planes_coloring_book/sprites/image6.png',
  ],
  drawing: false,
  raduis: 10,
  draw(context, x1, y1, x2, y2) {
    context.beginPath();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = this.color;
    context.lineWidth = this.raduis;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  },
  start(img) {
    context2.clearRect(0,0,canvas2.width,canvas2.height);
    context1.clearRect(0,0,canvas2.width,canvas2.height);
    image = new Image();
    image.src = game.pics[img];
    image.onload = _ => {
      context1.beginPath();
      context1.drawImage(image,0,0,canvas2.width,canvas2.height);
      context1.closePath();
    }
  }
}

canvas1.onmousemove = _ => {
  if (game.drawing) {
    game.draw(context2, game.x, game.y, _.offsetX, _.offsetY);
    game.x = _.offsetX;
    game.y = _.offsetY;
  }
}

canvas1.onmousedown = _ => {
  game.x = _.offsetX;
  game.y = _.offsetY;
  game.drawing = true;
};

canvas1.onmouseup = _ => {
  if (game.drawing) {
    game.draw(context2, game.x, game.y, _.offsetX, _.offsetY);
    game.x = 0;
    game.y = 0;
    game.drawing = false;
  }
};


document.querySelector('.colors').onclick = _ => { if (_.target.localName == 'span') game.color = window.getComputedStyle(_.target).backgroundColor; }


document.querySelector('.pics').onclick = _ => { if (_.target.localName == 'img') game.start(parseInt(_.target.id.slice(1))); }

window.onload = _ => {
  image = new Image();
  image.src = game.pics[0];
  image.onload = _ => {
    context1.beginPath();
    context1.drawImage(image, 0, 0, canvas2.width, canvas2.height);
    context1.closePath();
  }
}