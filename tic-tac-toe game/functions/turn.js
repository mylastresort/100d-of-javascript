function changeTurn() {
  if (game.turn === 'bot') {
    game.turn = 'human';
    return game.players.human;
  } else {
    game.turn = 'bot';
    return game.players.bot;
  }
}