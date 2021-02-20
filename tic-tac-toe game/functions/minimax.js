let killAlgo = 8;

function minimax(reboard, depth, alpha, beta, isMaximazing) {
  if (checkWin(reboard) === 1) return 0;
  else if (checkWin(reboard) === 2) return depth - 10;
  else if (checkWin(reboard) === 3) return 10 - depth;

  if (new Date() / 1000 - start > killAlgo) {
    // console.log(`the algo took ${killAlgo}s with no result back. Injectinga a random case!!`);
    choice = avail(board)[Math.floor(Math.random() * avail(board).length)];
    return 0;
  }
  if (depth >= maxDepth) return 0;

  depth += 1;
  let availableMoves = avail(reboard);
  let move, result, possible_game;
  if (isMaximazing) {
    let player = game.players.bot;
    for (var i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];
      possible_game = getNewBoard(move, reboard);
      findMatch(game.algo.checkAi(), move, player);
      result = minimax(possible_game, depth, alpha, beta, false);
      findMatch(game.algo.checkAi(), move, "empty");
      reboard = undoMove(reboard, move);
      if (result > alpha) {
        alpha = result;
        if (depth == 1) choice = move;
      } else if (alpha >= beta) return alpha;
    }
    return alpha;
  } else {
    let player = game.players.human;
    for (var i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];
      possible_game = getNewBoard(move, reboard);
      findMatch(game.algo.checkAi(), move, player);
      result = minimax(possible_game, depth, alpha, beta, true);
      findMatch(game.algo.checkAi(), move, "empty");
      reboard = undoMove(reboard, move);
      if (result < beta) {
        beta = result;
        if (depth == 1) choice = move;
      } else if (beta <= alpha) return beta;
    }
    return beta;
  }
}