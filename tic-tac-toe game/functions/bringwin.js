function bringWin() {
  let checking = game.inputs.check();
  let win = null;
  for (let z = 0; z < 4; z++) {
    checking.next().value.forEach(e => {
      e.forEach(groupsArray => {
        if (!groupsArray.some(_ => _ === game.players.human)) {
          const test = groupsArray.filter(inpt => inpt !== game.players.bot);
          if (test.length === 1) win = test[0];
        }
      })
    })
  }
  return win;
}