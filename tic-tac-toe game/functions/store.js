function store(caseIndex, player) {
  let checkin = game.inputs.check()
  for (let i = 0; i < 4; i++) {
    checkin.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        e.set(group, groupsArray.map(_ => { if (_ == caseIndex) return player; else return _; }))
      })
    })
  }
  let storeforai = game.algo.checkAi();
  for (let i = 0; i < 4; i++) {
    storeforai.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (groupsArray.some(d => d.index == caseIndex)) {
          e.set(group, groupsArray.map(_ => { if (caseIndex == _.index) { _.algo = player; return _; } else return _; }))
        }
      })
    })
  }
}