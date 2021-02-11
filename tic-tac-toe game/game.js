////showing a message: i'll show no mercy, you're okay with that?
const game = {
  turn: null,
  players: { human: null, bot: null },
  xo: { o: ['o0.png', 'o1.png', 'o2.png'], x: ['x0.png', 'x1.png', 'x2.png'] },
  inputs: {
    list: {
      lines: new Map(),
      colomuns: new Map(),
      reverseL: new Map(),
      reverseR: new Map()
    },
    generateMemory() {
      const grids = game.level.grids;
      const required = game.level.required;
      const diffrence = grids - required;
      const lin = this.list.lines;
      const col = this.list.colomuns;
      const rel = this.list.reverseL;
      const rer = this.list.reverseR;
      //diffrence: to maitain every line/column possible if the user changed the number required cases to win
      for (let i = 0; i < grids; i++) {
        lin.set(`L${i}`, new Map())
        col.set(`C${i}`, new Map())
      }
      for (let i = 0; i < diffrence + 1; i++) {
        for (let p = 0; p < grids; p++) {
          lin.get(`L${p}`).set(i, Array.apply(0, Array(required)).map((_, index) => index + i + (p * grids)))
          col.get(`C${p}`).set(i, Array.apply(0, Array(required)).map((_, index) => (grids * (index + i)) + p))
        }
      }
      rel.set(`Rl0`, new Map())
      rer.set(`Rr0`, new Map())
      for (let i = 0; i < (diffrence) * 2; i++) {
        rel.set(`Rl${i + 1}`, new Map())
        rer.set(`Rr${i + 1}`, new Map())
      }
      for (let i = 0; i < diffrence + 1; i++) {
        rel.get(`Rl0`).set(i, Array.apply(0, Array(required)).map((_, index) => ((i + index) * grids) + i + index))
        rer.get(`Rr0`).set(i, Array.apply(0, Array(required)).map((_, index) => ((i + index) * grids) + (grids - 1) - (i + index)))
      }
      let counter = grids - required
      for (let i = 0; i < diffrence; i++) {
        for (let p = 0; p < counter; p++) {
          rel.get(`Rl${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + index) * grids) + p + index + (i + 1)))
          rer.get(`Rr${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + index) * grids) + (grids - 1) - (p + index + (i + 1))))
        }
        counter--;
      }
      counter = grids - required
      for (let i = diffrence; i < diffrence * 2; i++) {
        for (let p = 0; p < counter; p++) {
          rel.get(`Rl${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + i + 1 - diffrence + index) * grids) + (p + index)))
          rer.get(`Rr${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + i + 1 - diffrence + index) * grids) + (grids - 1) - (p + index)))
        }
        counter--;
      }
    },
    play(element) {
      const img = document.createElement('img');
      let player = game.players[game.turn];
      if (game.turn === 'human') game.turn = 'bot';
      else game.turn = 'human';
      img.setAttribute('src', game.xo[player][Math.floor(Math.random() * 3)])
      img.setAttribute('alt', player)
      element.appendChild(img);
      const caseIndex = parseInt(element.getAttribute('id'));
      let checkin = this.check();
      for (let i = 0; i < 4; i++) {
        checkin.next().value.forEach((e, line) => {
          e.forEach((groupsArray, group) => {
            e.set(group, groupsArray.map(_ => { if (_ == caseIndex) return player; else return _; }))
          })
        })
      }
      board[caseIndex] = player;
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
    }
  },
  level: {
    grids: null,
    required: null,
    //the grids must NOT be even otherwise some reversed lines will be missed while generating
    generate() {
      let deadline = 0;
      while (deadline < Math.pow(this.grids, 2)) {
        let element = document.createElement('span')
        element.setAttribute('id', deadline)
        element.classList = 'case'
        element.setAttribute('onclick', 'move(this)')
        document.body.querySelector('.app').appendChild(element)
        deadline++;
      }
      document.getElementById('app').style.gridTemplateColumns = `repeat(${this.grids},1fr)`
      document.getElementById('app').style.gridTemplateRows = `repeat(${this.grids},1fr)`
      // document.querySelectorAll('.case').forEach(e=>e.textContent=e.getAttribute('case-key'))
    }
  }
}


game.players.human = 'x';
game.players.bot = 'o';
game.level.grids = 3;
game.level.required = 3;
game.turn = 'human';
var board = Array.apply(0, Array(Math.pow(game.level.grids, 2))).map((_, index) => index);
let app = document.createElement('div')
app.setAttribute('class', 'app')
app.setAttribute('id', 'app')
document.body.appendChild(app)
game.inputs.generateMemory()
game.level.generate()






var newMap = {
  lines: new Map(),
  colomuns: new Map(),
  reverseL: new Map(),
  reverseR: new Map()
}


function generateAlgoMemory(d) {
  const grids = game.level.grids;
  const required = game.level.required;
  const diffrence = grids - required;
  const lin = newMap.lines;
  const col = newMap.colomuns;
  const rel = newMap.reverseL;
  const rer = newMap.reverseR;
  //diffrence: to maitain every line/column possible if the user changed the number required cases to win
  for (let i = 0; i < grids; i++) {
    lin.set(`L${i}`, new Map())
    col.set(`C${i}`, new Map())
  }
  for (let i = 0; i < diffrence + 1; i++) {
    for (let p = 0; p < grids; p++) {
      lin.get(`L${p}`).set(i, Array.apply(0, Array(required)).map((_, index) => index + i + (p * grids)))
      col.get(`C${p}`).set(i, Array.apply(0, Array(required)).map((_, index) => (grids * (index + i)) + p))
    }
  }
  rel.set(`Rl0`, new Map())
  rer.set(`Rr0`, new Map())
  for (let i = 0; i < (diffrence) * 2; i++) {
    rel.set(`Rl${i + 1}`, new Map())
    rer.set(`Rr${i + 1}`, new Map())
  }
  for (let i = 0; i < diffrence + 1; i++) {
    rel.get(`Rl0`).set(i, Array.apply(0, Array(required)).map((_, index) => ((i + index) * grids) + i + index))
    rer.get(`Rr0`).set(i, Array.apply(0, Array(required)).map((_, index) => ((i + index) * grids) + (grids - 1) - (i + index)))
  }
  let counter = grids - required
  for (let i = 0; i < diffrence; i++) {
    for (let p = 0; p < counter; p++) {
      rel.get(`Rl${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + index) * grids) + p + index + (i + 1)))
      rer.get(`Rr${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + index) * grids) + (grids - 1) - (p + index + (i + 1))))
    }
    counter--;
  }
  counter = grids - required
  for (let i = diffrence; i < diffrence * 2; i++) {
    for (let p = 0; p < counter; p++) {
      rel.get(`Rl${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + i + 1 - diffrence + index) * grids) + (p + index)))
      rer.get(`Rr${i + 1}`).set(p, Array.apply(0, Array(required)).map((_, index) => ((p + i + 1 - diffrence + index) * grids) + (grids - 1) - (p + index)))
    }
    counter--;
  }
  for (let key in d) {
    d[key].forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        e.set(group, groupsArray.map(_ => ({ index: _, algo: 'empty' })))
      })
    })
  }
}

generateAlgoMemory(newMap)


function test(data) {
  let checking = data;
  let winner = null;
  for (let i = 0; i < 4; i++) {
    checking.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (groupsArray.every(usrIpt => usrIpt.algo == 'x')) {
          // console.warn(`Algo test : the X player won the game with line ${group} in ${line}`)
          if (game.players.human == 'x') winner = 'hu'; else winner = 'ai';
        } else if (groupsArray.every(usrIpt => usrIpt.algo == 'o')) {
          // console.warn(`Algo test : the O player won the game with line ${group} in ${line}`)
          if (game.players.human == 'o') winner = 'hu'; else winner = 'ai';
        }
      })
    })
    if (winner) return winner;
  }
  return winner
}

function* checkAi() {
  yield newMap.colomuns;
  yield newMap.lines;
  yield newMap.reverseL;
  yield newMap.reverseR;
}
var iter = 0;
var round = 0;
var lastInpt = board.length - 1


function reset() {
  round = 0;
  var board = Array.apply(0, Array(Math.pow(game.level.grids, 2))).map((_, index) => index);

}

//available spots
function avail(reboard) {
  return reboard.filter(s => s != "x" && s != "o");
}


function move(element) {
  if (element.children.length > 0) return false;
  game.inputs.play(element)
  round++;
  //fill the index of the case with x or o
  if (game.inputs.test(game.inputs.check()) == 'hu') {
    alert("YOU WIN");
    return;
  } else if (round > lastInpt) {
    alert("TIE");
    return;
  } else {
    round++;
    //call the minimax function
    var { index, score } = minimax(board, game.players.bot);
    // console.log(index, score);
    board[index] = game.players.bot;
    game.inputs.play(document.getElementById(index))
    if (game.inputs.test(game.inputs.check()) == 'ai') {
      alert("YOU LOSE");
      return;
    } else if (round === 0) {
      alert("tie");
      return;
    }
  }
}


function findMatch(element, replace, data) {
  let checking = data;
  for (let i = 0; i < 4; i++) {
    checking.next().value.forEach((e, line) => {
      e.forEach((groupsArray, group) => {
        if (typeof replace == 'string') {
          if (groupsArray.some(d => d.index == element)) {
            e.set(group, groupsArray.map(_ => { if (element == _.index) { _.algo = replace; return _; } else return _; }))
          }
        } else if (typeof replace == 'number') {
          if (groupsArray.some(d => d.index == element)) {
            e.set(group, groupsArray.map(_ => { if (element == _.index) { _.algo = 'empty'; return _; } else return _; }))
          }
        }
      })
    })
  }
}


function minimax(reboard, player) {
  iter++;
  let availSpots = avail(reboard);
  //return a value if a terminal state is found (+10, 0, -10)
  if (test(checkAi()) == 'hu') return { score: -10 };
  else if (test(checkAi()) == 'ai') return { score: 10 };
  else if (availSpots.length === 0) return { score: 0 };
  var moves = [];
  //go through available spots on the board
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = reboard[availSpots[i]];
    // making a copy of this one by the one od the above: reboard[availSpots[i]] = player;
    let replacewithplayer = checkAi();
    for (let z in newMap) {
      replacewithplayer.next().value.forEach((e, line) => {
        e.forEach((groupsArray, group) => {
          if (groupsArray.some(d => d.index == availSpots[i])) {
            e.set(group, groupsArray.map(_ => { if (availSpots[i] == _.index) { _.algo = player; return _; } else return _; }))
          }
        })
      })
    }
    reboard[availSpots[i]] = player;
    //call the minimax function on each available spot (recursion)
    if (player == game.players.bot) {
      var g = minimax(reboard, game.players.human);
      move.score = g.score;
    } else {
      var g = minimax(reboard, game.players.bot);
      move.score = g.score;
    }
    // replacing this one with the above : reboard[availSpots[i]] = move.index;
    let replacewithnum = checkAi();
    for (let z in newMap) {
      replacewithnum.next().value.forEach((e, line) => {
        e.forEach((groupsArray, group) => {
          if (groupsArray.some(d => d.index == availSpots[i])) {
            e.set(group, groupsArray.map(_ => { if (availSpots[i] == _.index) { _.algo = 'empty'; return _; } else return _; }))
          }
        })
      })
    }
    reboard[availSpots[i]] = move.index;
    moves.push(move);
  }
  //return the best value
  var bestMove;
  if (player === game.players.bot) {
    var bestScore = -Infinity;
    for (var q = 0; q < moves.length; q++) {
      if (moves[q].score > bestScore) {
        bestScore = moves[q].score;
        bestMove = q;
      }
    }
  } else {
    var bestScore = Infinity;
    for (var q = 0; q < moves.length; q++) {
      if (moves[q].score < bestScore) {
        bestScore = moves[q].score;
        bestMove = q;
      }
    }
  }
  return moves[bestMove];
}