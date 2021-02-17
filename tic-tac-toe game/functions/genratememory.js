function generateMemory(gri, req, lin, col, rel, rer, forTest) {
  const dif = gri - req;
  //diffrence: to maitain every line/column possible if the user changed the number required cases to win
  for (let i = 0; i < gri; i++) {
    lin.set(`L${i}`, new Map())
    col.set(`C${i}`, new Map())
  }
  for (let i = 0; i < dif + 1; i++) {
    for (let p = 0; p < gri; p++) {
      lin.get(`L${p}`).set(i, Array.apply(0, Array(req)).map((_, index) => index + i + (p * gri)))
      col.get(`C${p}`).set(i, Array.apply(0, Array(req)).map((_, index) => (gri * (index + i)) + p))
    }
  }
  rel.set(`Rl0`, new Map())
  rer.set(`Rr0`, new Map())
  for (let i = 0; i < (dif) * 2; i++) {
    rel.set(`Rl${i + 1}`, new Map())
    rer.set(`Rr${i + 1}`, new Map())
  }
  for (let i = 0; i < dif + 1; i++) {
    rel.get(`Rl0`).set(i, Array.apply(0, Array(req)).map((_, index) => ((i + index) * gri) + i + index))
    rer.get(`Rr0`).set(i, Array.apply(0, Array(req)).map((_, index) => ((i + index) * gri) + (gri - 1) - (i + index)))
  }
  let counter = gri - req
  for (let i = 0; i < dif; i++) {
    for (let p = 0; p < counter; p++) {
      rel.get(`Rl${i + 1}`).set(p, Array.apply(0, Array(req)).map((_, index) => ((p + index) * gri) + p + index + (i + 1)))
      rer.get(`Rr${i + 1}`).set(p, Array.apply(0, Array(req)).map((_, index) => ((p + index) * gri) + (gri - 1) - (p + index + (i + 1))))
    }
    counter--;
  }
  counter = gri - req
  for (let i = dif; i < dif * 2; i++) {
    for (let p = 0; p < counter; p++) {
      rel.get(`Rl${i + 1}`).set(p, Array.apply(0, Array(req)).map((_, index) => ((p + i + 1 - dif + index) * gri) + (p + index)))
      rer.get(`Rr${i + 1}`).set(p, Array.apply(0, Array(req)).map((_, index) => ((p + i + 1 - dif + index) * gri) + (gri - 1) - (p + index)))
    }
    counter--;
  }
  if (forTest) {
    for (let key in game.algo.list) {
      game.algo.list[key].forEach((e, line) => {
        e.forEach((groupsArray, group) => {
          e.set(group, groupsArray.map(_ => ({ index: _, algo: 'empty' })))
        })
      })
    }
  }
}