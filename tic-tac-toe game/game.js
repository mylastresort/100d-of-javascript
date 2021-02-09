////showing a message: i'll show no mercy, you're okay with that?
const game = {
  turn: null,
  xo: {
    o: ['o0.png', 'o1.png', 'o2.png'],
    x: ['x0.png', 'x1.png', 'x2.png']
  },
  inputs: {
    list: {
      lines: new Map(),
      colomuns: new Map(),
      reverseL: new Map(),
      reverseR: new Map()
    },
    generateMemory() {
      const diffrence = game.level.grids - game.level.required;
      //diffrence: to maitain every line/column possible if the user changed the number required cases to win
      for (let i = 0; i < game.level.grids; i++) {
        this.list.lines.set(`L${i}`, new Map())
        this.list.colomuns.set(`C${i}`, new Map())
      }
      for (let i = 0; i < diffrence + 1; i++) {
        for (let p = 0; p < game.level.grids; p++) {
          this.list.lines.get(`L${p}`).set(i, [])
          this.list.colomuns.get(`C${p}`).set(i, [])
        }
      }
      this.list.reverseL.set(`Rl0`, new Map())
      this.list.reverseR.set(`Rr0`, new Map())
      for (let i = 0; i < (diffrence) * 2; i++) {
        this.list.reverseL.set(`Rl${i + 1}`, new Map())
        this.list.reverseR.set(`Rr${i + 1}`, new Map())
      }
      for (let i = 0; i < diffrence + 1; i++) {
        this.list.reverseL.get(`Rl0`).set(i, [])
        this.list.reverseR.get(`Rr0`).set(i, [])
      }
      let counter = game.level.grids - game.level.required
      for (let i = 0; i < diffrence; i++) {
        for (let p = 0; p < counter; p++) {
          this.list.reverseL.get(`Rl${i + 1}`).set(p, [])
          this.list.reverseR.get(`Rr${i + 1}`).set(p, [])
        }
        counter--;
      }
      counter = game.level.grids - game.level.required
      for (let i = diffrence; i < diffrence * 2; i++) {
        for (let p = 0; p < counter; p++) {
          this.list.reverseL.get(`Rl${i + 1}`).set(p, [])
          this.list.reverseR.get(`Rr${i + 1}`).set(p, [])
        }
        counter--;
      }
    },
    play(element) {
      if (element.children.length > 0) return false;
      const img = document.createElement('img');
      let player = null;
      if (!!game.turn) {
        player = 'x';
        game.turn = 0;
        img.setAttribute('src', Object.values(game.xo)[1][Math.floor(Math.random() * 3)])
      } else {
        player = 'o';
        game.turn = 1;
        img.setAttribute('src', Object.values(game.xo)[0][Math.floor(Math.random() * 3)])
      }
      const id = element.getAttribute('case-key');
      element.appendChild(img);
      const colomun = id.split('-')[0]
      const line = id.split('-')[1]
      const Rel = id.split('-')[2]
      const Rer = id.split('-')[3]
      const nColomun = parseInt(colomun[1])
      const nLine = parseInt(line[1])
      const nRel = parseInt(Rel[4])
      const nRer = parseInt(Rer[4])
      const lineRel = Rel.slice(0, 3)
      const lineRer = Rer.slice(0, 3)
      ///assuming that this input is the last element on a line (line:lines i made on inputs object)
      //get the start case possible on inputs objects (in case for lines:we grab it from the colomun) and it must not be negative
      let key = nColomun - game.level.required + 1
      //for Lines
      if (key < 0) key = 0;
      //pushing the input starting from line 'key' on inputs
      ///example:if the nColomun is C2 and the required is 3 then the start is C0, the end is C[nColomun]
      for (let i = key; i < nColomun + 1; i++) {
        if (this.list.lines.get(line).get(i) !== undefined) {
          this.list.lines.get(line).get(i).push(player)
        }
      }
      //////same for Colomuns
      key = nLine - game.level.required + 1
      if (key < 0) key = 0;
      //pushing the input starting from line 'key' on inputs
      for (let i = key; i < nLine + 1; i++) {
        if (this.list.colomuns.get(colomun).get(i) !== undefined) {
          this.list.colomuns.get(colomun).get(i).push(player)
        }
      }
      //////for reversed lines (leftside)
      if (Rel !== 'no') {
        key = nRel - game.level.required + 1
        if (key < 0) key = 0;
        //pushing the input starting from line 'key' on inputs
        for (let i = key; i < nRel + 1; i++) {
          if (this.list.reverseL.get(lineRel).get(i) !== undefined) {
            this.list.reverseL.get(lineRel).get(i).push(player)
          }
        }
      }
      ///////for reversed lines (rightside)
      if (Rer !== 'no') {
        key = nRer - game.level.required + 1
        if (key < 0) key = 0;
        //pushing the input starting from line 'key' on inputs
        for (let i = key; i < nRer + 1; i++) {
          if (this.list.reverseR.get(lineRer).get(i) !== undefined) {
            this.list.reverseR.get(lineRer).get(i).push(player)
          }
        }
      }
      setTimeout(() => {
        let checking = this.check()
        for (let i in this.list) {
          checking.next().value.forEach((e, line) => {
            e.forEach((e, group) => {
              if (e.length === game.level.required) {
                if (e.every(e => e == 'x')) {
                  alert(`the X player won the game with line ${group} in ${line}`)
                }
                if (e.length === game.level.required) {
                  if (e.every(e => e == 'o')) {
                    alert(`the O player won the game with line ${group} in ${line}`)
                  }
                }
              }
            })
          })
        }
      }, 50);
    },
    *check() {
      yield this.list.colomuns;
      yield this.list.lines;
      yield this.list.reverseL;
      yield this.list.reverseR;
    },
  },
  level: {
    grids: null,
    required: null,       //the grids must NOT be even otherwise some reversed lines will be missed while generating
    generate() {
      let reversed = new Map()
      for (let i = 0; i < this.grids; i++) reversed.set(`L${i}`, new Array());
      const diffrence = this.grids - this.required + 1;
      let deadline = 0;
      while (deadline < Math.pow(this.grids, 2)) {
        let case_key = new Array();       //lines,colomuns,left reversed lines
        let c = `C${deadline % this.grids}`;
        let l = `L${Math.floor(deadline / this.grids)}`;
        case_key.push(c)
        case_key.push(l)
        c = parseInt(c.slice(1))
        l = parseInt(l.slice(1))
        if (c >= l && c - l < diffrence) {
          rl = `Rl${c - l}'${l}`;
        } else if (c < l && l - c < diffrence) {
          rl = `Rl${l - c + diffrence - 1}'${c}`;
        } else {
          rl = 'no'
        }
        reversed.get(`L${l}`).push(rl.slice(2))
        case_key.push(rl)
        let result = case_key.join('-');
        let element = document.createElement('span')
        element.setAttribute('case-key', result)
        element.classList = 'case'
        element.setAttribute('onclick', 'game.inputs.play(this)')
        document.body.querySelector('.app').appendChild(element)
        deadline++;
      }
      ///for rr im gonna add the reversed arrays on the rr Map
      reversed.forEach(e => e.reverse())
      let counter = 0;
      document.querySelectorAll('.case').forEach(e => {
        let result = e.getAttribute('case-key');
        let index = result.slice(4)[0]
        let rr = reversed.get(`L${index}`)[counter]
        rr === '' ? result += '-no' : result += `-Rr${rr}`;
        e.setAttribute('case-key', result)
        counter = (this.grids - 1 === counter) ? 0 : counter + 1;
      })
      document.getElementById('app').style.gridTemplateColumns = `repeat(${this.grids},1fr)`
      document.getElementById('app').style.gridTemplateRows = `repeat(${this.grids},1fr)`
      // document.querySelectorAll('.case').forEach(e=>e.textContent=e.getAttribute('case-key'))
    }
  }
}