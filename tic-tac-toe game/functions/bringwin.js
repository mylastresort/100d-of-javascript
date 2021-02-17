function bringWin() {
  let checking = game.inputs.check();
  let win = null;
  for (let i in game.inputs.list) {
    checking.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (!groupsArray.some(_ => _ === game.players.human)) {
          const test = groupsArray.filter(inpt => inpt !== game.players.bot);
          if (test.length === 1) win = test[0];
        }
      })
    })
  }
  return win;
}