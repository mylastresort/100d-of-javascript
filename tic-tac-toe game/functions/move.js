function move(element) {
  if (!!element.children[0].getAttribute('src')) return;
  board[parseInt(element.id)] = game.players.human;
  element.children[0].setAttribute('src', game.xo[game.players.human][Math.floor(Math.random() * 3)])
  element.children[0].setAttribute('alt', game.players[game.players.human])
  store(parseInt(element.id), game.players.human)
  round++;
  if (firstCheck(game.inputs.check()) == 'hu') {
    setTimeout(_ => {
      alert("YOU WIN")
    }, 50)
    return;
  } else if (round > lastInpt) {
    setTimeout(_ => alert("TIE"), 50)
    return;
  } else {
    round++;
    game.turn = 'bot';
    setTimeout(_ => makeAIMove(),10)
  }
}