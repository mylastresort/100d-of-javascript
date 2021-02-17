function makeAIMove() {
  if (!!bringWin() || bringWin() === 0) {
    // console.log('taking a win!!');
    var move = bringWin();
  } else if (!!avoidLoss() || avoidLoss() === 0) {
    // console.log('avoiding a loss!!');
    var move = avoidLoss();
  } else {
    start = new Date() / 1000;
    // console.log('implementing the algo!!');
    incr = round * 0.25;
    minimax(board, 0, -Infinity, Infinity, true);
    var move = choice;
  }
  // console.log(move);
  board[move] = game.players.bot;

  const img = document.createElement('img');
  img.setAttribute('src', game.xo[game.players.bot][Math.floor(Math.random() * 3)]);
  img.setAttribute('alt', game.players[game.players.bot]);
  document.getElementById(move).appendChild(img);

  store(move, game.players.bot);

  choice = [];
  game.turn = 'human';
  if (firstCheck(game.inputs.check()) == 'ai') setTimeout(_ => { alert("YOU LOSE") }, 50);
  else if (round === 0) setTimeout(_ => { alert("tie") }, 50);
}