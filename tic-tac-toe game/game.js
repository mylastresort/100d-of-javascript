////showing a message: i'll show no mercy, you're okay with that?
const game = {
  turn: null,
  players: {
    bot: null,
    human: null
  },
  level: {
    grids: null,
    required: null
  },
  xo: {
    o: ['./png/o0.png', './png/o1.png', './png/o2.png'],
    x: ['./png/x0.png', './png/x1.png', './png/x2.png']
  },
  algo: {
    list:{
      lines: new Map(),
      colomuns: new Map(),
      reverseL: new Map(),
      reverseR: new Map()
    },
    *checkAi() {
      yield this.list.colomuns;
      yield this.list.lines;
      yield this.list.reverseL;
      yield this.list.reverseR;
    }
  },
  inputs: {
    list: {
      lines: new Map(),
      colomuns: new Map(),
      reverseL: new Map(),
      reverseR: new Map()
    },
    *check() {
      yield this.list.colomuns;
      yield this.list.lines;
      yield this.list.reverseL;
      yield this.list.reverseR;
    }
  }
}