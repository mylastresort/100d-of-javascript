function firstCheck(data) {
  let checking = data;
  let winner = null;
  for (let z = 0; z < 4; z++) {
    checking.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (groupsArray.every(usrIpt => usrIpt == 'x')) {
          // console.warn(`the X player won the game with line ${group} in ${line}`)
          animateCases(line,group)
          if (game.players.human == 'x') winner = 'hu'
          else winner = 'ai'
        }
        if (groupsArray.every(usrIpt => usrIpt == 'o')) {
          // console.warn(`the O player won the game with line ${group} in ${line}`)
          animateCases(line,group)
          if (game.players.human == 'o') winner = 'hu'
          else winner = 'ai';
        }
      })
    })
    if (!!winner) return winner;
  }
  return null
}