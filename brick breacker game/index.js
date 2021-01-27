const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const game = {
  lifes:3,
  ball: {
    size: 15,
    dy:-2,
    dx:2,
    x: null,
    y: null,
    move() {
      context.beginPath();
      context.clearRect(0,0,canvas.width,canvas.height);
      this.make();
      game.paddle.drawPaddel();
      if (this.y + this.dy < this.size) this.dy = -this.dy;
      else if (this.y + this.dy > canvas.height - this.size) {
        if (this.x > game.paddle.x && this.x < game.paddle.x + game.paddle.size.w) {
          this.dy = -this.dy
        } else {
          game.lifes--;
          if (!game.lifes) {
            alert("GAME OVER");
            document.location.reload();
          } else game.restart();
        }
      }
      if (this.x + this.dx > canvas.width - this.size || this.x + this.dx < this.size) {
        this.dx = -this.dx;
      };
      if(this.y + this.size > game.paddle.y
        && (this.x + this.size <= game.paddle.x
        || this.x <= game.paddle.x + game.paddle.size.w) ) {
        this.dy = -this.dy
      }
      this.x += this.dx;
      this.y += this.dy;
      context.closePath();
      game.bricks.show();
      game.bricks.testCollision();
      document.getElementById('score').textContent = `Score : ${game.score}`;
      document.getElementById('lifes').textContent = `Lifes : ${game.lifes}`;
      requestAnimationFrame(game.ball.move.bind(this));
    },
    make() {
      context.beginPath();
      context.fillStyle = 'orange';
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    }
  },
  speed: 20,
  paddle: {
    size: {
      w: 100,
      h: 14
    },
    get y() { return canvas.height - 5 - this.size.h },
    x: null,
    speed:20,
    drawPaddel() {
      context.beginPath();
      context.fillStyle = '#ffd460';
      context.fillRect(this.x,this.y,this.size.w, this.size.h);
      context.closePath();
    }
  },
  inPlay: false,
  score:0,
  bricks: {
    list: new Array(),
    margin:10,
    width:80,
    height:20,
    colomuns:35,    //in percentage
    raws:25,      //in percentage
    show() {
      const width = Math.floor(canvas.width - ((this.colomuns * canvas.width) / canvas.width));
      const height = Math.floor((this.raws * canvas.height) / canvas.height);
      if (!game.inPlay) {
        let c = 0;
        for (let y = height; y <= Math.floor((150 * canvas.height) / canvas.height); y += (this.height + this.margin)) {
          this.list.push(new Array());
          for (let x = canvas.width - width; x <= width; x += (this.width + this.margin)) {
            this.list[c].push({
              x: null,
              y: null,
              status: true
            });
          };
          c++;
        };
        game.inPlay = true;
      };
      colomunCounter = 0;
      for (let y = height; y <= Math.floor((150 * canvas.height) / canvas.height); y += (this.height + this.margin)) {
        rawCounter = 0;
        for (let x = canvas.width - width; x <= width; x += (this.width + this.margin)) {
          console.log(this.list[colomunCounter][rawCounter].status);
          if(this.list[colomunCounter][rawCounter].status) {
            this.list[colomunCounter][rawCounter].x = x;
            this.list[colomunCounter][rawCounter].y = y;
            context.fillStyle = '#cecece';
            context.fillRect(this.list[colomunCounter][rawCounter].x, this.list[colomunCounter][rawCounter].y, this.width, this.height);
          }
          rawCounter++;
        };
        colomunCounter++;
      };
    },
    testCollision() {
      for (colomun of this.list) {
        for (raw of colomun) {
          if (raw.status) {
            if (game.ball.x > raw.x
              && game.ball.x < raw.x + this.width
              && game.ball.y > raw.y
              && game.ball.y < raw.y + this.height) {
              game.ball.dy = -game.ball.dy;
              raw.status = false;
              game.score++;
              if (game.score === this.list[0].length * this.list.length) {
                alert("YOU WIN!");
                document.location.reload();
              }
            }
          }
        }
      }
    }
  },
  restart() {
    this.paddle.x = Math.floor(canvas.width / 2) - (this.paddle.size.w / 2);
    this.ball.x = this.paddle.x + (this.paddle.size.w / 2);
    this.ball.y = canvas.height - (5 + this.paddle.size.h + this.ball.size);
    this.ball.make();
    context.fillStyle = '#ffd460';
    context.fillRect(this.paddle.x, this.paddle.y, this.paddle.size.w, this.paddle.size.h);
    this.bricks.show();
    this.bricks.testCollision();
    this.inPlay = true;
  },
  ballFirstSpot: {
    x:null,
    y:null
  }
};

document.onkeydown = key => {
  if (key.code === 'ArrowLeft') {
    if (game.ball.y === game.ballFirstSpot.y && game.ball.x === game.paddle.x + (game.paddle.size.w / 2))
      game.ball.x += game.ball.dx;
    if (game.paddle.x > 0)
      game.paddle.x -= game.paddle.speed;
  } else if (key.code === 'ArrowRight') {
    if (game.ball.y === game.ballFirstSpot.y && game.ball.x === game.paddle.x + (game.paddle.size.w / 2))
      game.ball.x += game.ball.dx;
    if (game.paddle.x + game.paddle.size.w < canvas.width)
      game.paddle.x += game.paddle.speed;
  } else if (key.code === 'Space') {
    game.ball.move();
  }
};

window.onload = _ => {
  game.ballFirstSpot.x = Math.floor(canvas.width / 2) - (game.paddle.size.w / 2) + (game.paddle.size.w / 2);
  game.ballFirstSpot.y = canvas.height - (5 + game.paddle.size.h + game.ball.size);
  game.restart();
};

canvas.onmousemove = mouse => {
  var relativeX = mouse.clientX - canvas.offsetLeft;
  if (relativeX > 0 + game.paddle.size.w / 2 && relativeX < canvas.width - game.paddle.size.w / 2) {
    game.paddle.x = relativeX - game.paddle.size.w / 2;
  }
};