function move(element) {
  if (element.children.length > 0) return;
  board[parseInt(element.id)] = game.players.human;
  const img = document.createElement('img');
  img.setAttribute('src', game.xo[game.players.human][Math.floor(Math.random() * 3)])
  img.setAttribute('alt', game.players[game.players.human])
  document.getElementById(parseInt(element.id)).appendChild(img);
  game.inputs.store(parseInt(element.id), game.players.human)
  round++;
  if (game.inputs.test(game.inputs.check()) == 'hu') {
    setTimeout(_ => { alert("YOU WIN") }, 50)
    return;
  } else if (round > lastInpt) {
    setTimeout(_ => { alert("TIE") }, 50)
    return;
  } else {
    round++;
    game.turn = 'bot';
    makeAIMove()
  }
}