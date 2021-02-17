function undoMove(reboard, move) {
  reboard[move] = ' ';
  changeTurn();
  return reboard;
}