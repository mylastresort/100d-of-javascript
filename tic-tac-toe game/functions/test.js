function test(data) {
  let checking = data;
  let winner = null;
  for (let w = 0; w < 4; w++) {
    checking.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (groupsArray.every(usrIpt => usrIpt.algo == 'x')) {
          if (game.players.human == 'x') winner = 'hu'; else winner = 'ai';
        } else if (groupsArray.every(usrIpt => usrIpt.algo == 'o')) {
          if (game.players.human == 'o') winner = 'hu'; else winner = 'ai';
        }
      })
    })
    if (winner) return winner;
  }
  return winner
}