function avoidLoss() {
  let checking = game.inputs.check();
  let loss = null;
  for (let i in game.inputs.list) {
    checking.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (!groupsArray.some(_ => _ === game.players.bot)) {
          const test = groupsArray.filter(inpt => inpt !== game.players.human);
          if (test.length === 1) loss = test[0];
        }
      })
    })
  }
  return loss;
}