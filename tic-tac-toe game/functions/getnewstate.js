function getNewBoard(move, reboard) {
  reboard[move] = changeTurn();
  return reboard;
}