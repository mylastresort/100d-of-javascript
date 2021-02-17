const game = {
  xo: {
    o: ['./png/o0.png', './png/o1.png', './png/o2.png'],
    x: ['./png/x0.png', './png/x1.png', './png/x2.png']
  },
  turn: null,
  players: {
    bot: null,
    human: null
  },
  level: {
    grids: null,
    required: null
  },
  inputs: {
    list: {
      lines: new Map(),
      colomuns: new Map(),
      reverseL: new Map(),
      reverseR: new Map()
    },
    generateMemory(gri, req, lin, col, rel, rer, forTest) {
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
        for (let key in game.algo) {
          game.algo[key].forEach((e, line) => {
            e.forEach((groupsArray, group) => {
              e.set(group, groupsArray.map(_ => ({ index: _, algo: 'empty' })))
            })
          })
        }
      }
    },
    test(data) {
      let checking = data;
      let winner = null;
      for (let i in this.list) {
        checking.next().value.forEach((e, line) => {
          e.forEach((groupsArray, group) => {
            if (groupsArray.every(usrIpt => usrIpt == 'x')) {
              // console.warn(`the X player won the game with line ${group} in ${line}`)
              if (game.players.human == 'x') winner = 'hu'
              else winner = 'ai'
            }
            if (groupsArray.every(usrIpt => usrIpt == 'o')) {
              // console.warn(`the O player won the game with line ${group} in ${line}`)
              if (game.players.human == 'o') winner = 'hu'
              else winner = 'ai';
            }
          })
        })
        if (!!winner) return winner;
      }
      return null
    },
    store(caseIndex, player) {
      let checkin = this.check();
      for (let i = 0; i < 4; i++) {
        checkin.next().value.forEach((e, line) => {
          e.forEach((groupsArray, group) => {
            e.set(group, groupsArray.map(_ => { if (_ == caseIndex) return player; else return _; }))
          })
        })
      }
      let storeforai = checkAi();
      for (let i = 0; i < 4; i++) {
        storeforai.next().value.forEach((e, line) => {
          e.forEach((groupsArray, group) => {
            if (groupsArray.some(d => d.index == caseIndex)) {
              e.set(group, groupsArray.map(_ => { if (caseIndex == _.index) { _.algo = player; return _; } else return _; }))
            }
          })
        })
      }
    },
    *check() {
      yield this.list.colomuns;
      yield this.list.lines;
      yield this.list.reverseL;
      yield this.list.reverseR;
    }
  },
  algo: {
    lines: new Map(),
    colomuns: new Map(),
    reverseL: new Map(),
    reverseR: new Map()
  }
}