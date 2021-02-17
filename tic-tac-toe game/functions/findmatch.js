function findMatch(data, move, replace) {
  let ch = data;
  for (let z = 0; z < 4; z++) {
    ch.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (groupsArray.some(d => d.index == move)) {
          e.set(group, groupsArray.map(_ => { if (move == _.index) { _.algo = replace; return _; } else return _; }))
        }
      })
    })
  }
}