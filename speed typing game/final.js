//the paragraph to fetch
const text = "then came the night of the first falling star it was seen early in the morning rushing over winchester eastward a line of flame high in the atmosphere hundreds must have seen it and taken it for an ordinary falling star it seemed that it fell to earth about one hundred miles east of him";

const wordsInterface = document.getElementById('type-area');
const typearea = document.getElementById('words');

window.onload = init => {
  //count the words on the paragraph
  textSplited = text.split(' ');
  //create divs for n words
  textSplited.forEach((value, index) => {
    const wordElement = document.createElement('div');
    wordElement.setAttribute('id', `Div.${index}`);
    wordElement.classList = 'app';
    wordsInterface.appendChild(wordElement);
    //create spans for each letter
    for (const letter of value) {
      let letterElement = document.createElement('span');
      letterElement.classList = 'normal';
      let letterString = document.createTextNode(letter);
      letterElement.appendChild(letterString);
      wordElement.appendChild(letterElement);
    }
  })
  //set the bar at the first word
  document.getElementById('Div.0').style.borderBottom = "#646669 2.5px solid";
  typearea.value = ' ';
};

let debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const app = {
  score: 0,
  counter: 0,
  lastInptChecked() {
    let lastInpt = "";
    for (const letter of this.letters()) {
      if (letter.classList.value !== 'normal') {
        lastInpt += letter.textContent;
      }
    };
    return lastInpt;
  },
  letters() {
    return document.getElementById(`Div.${this.counter}`).childNodes
  },
  current() {
    return textSplited[this.counter]
  },
  showWrong: function (args) {
    const position = args[0]
    const letter = args[1]
    app.letters()[position].textContent = letter;
    app.letters()[position].classList = 'false';
  },
  showRight: function (position) {
    app.letters()[position].classList = 'true';
  },
  bug: function () {
    let falseLetter = document.createElement('span');
    falseLetter.classList = 'fix';
    let letter = typearea.value.trimStart().slice(-1);
    let letterElement = document.createTextNode(letter);
    falseLetter.appendChild(letterElement);
    document.getElementById(`Div.${app.counter}`).appendChild(falseLetter);
  }
};

let play = debounce(function (key) {
  document.getElementById('score').textContent = `Score : ${app.score}`
  check(key)
    .then(app.showRight)
    .catch(_ => { if (_ !== 'reject') { app.showWrong(_) } });
}, 0.4);

function check(key) {
  return new Promise((resolve, reject) => {
    if (key.data === ' ') {
      if (typearea.value.trim() === app.current()) app.score++;
      app.counter++;
      typearea.value = ' ';
      document.getElementById(`Div.${app.counter - 1}`).style.borderBottom = "";
      document.getElementById(`Div.${app.counter}`).style.borderBottom = "#646669 2.5px solid";
      reject('reject');
    } else if (typearea.value.trimStart().length > app.current().length && key.inputType !== 'deleteContentBackward'
    && key.data !== ' ') {
      app.bug();
      reject('reject');
    } else if (key.inputType === 'deleteContentBackward') {
      let position = app.lastInptChecked().length - 1;
      if (!!app.counter && !typearea.value.length) {
        app.letters()[0].textContent = app.current().charAt(0);
        app.letters()[0].classList = 'normal';
        app.counter--;
        typearea.value = ' '.concat(app.lastInptChecked());
        document.getElementById(`Div.${app.counter}`).style.borderBottom = "#646669 2.5px solid";
        document.getElementById(`Div.${app.counter + 1}`).style.borderBottom = "";
      } else if (app.letters()[position].classList === 'fix') {
        app.letters()[position].remove();
      } else {
        app.letters()[position].textContent = app.current().charAt(position);
        app.letters()[position].classList = 'normal';
      };
      reject('reject');
    } else if (typearea.value.trimStart().charAt(app.lastInptChecked().length) === app.current().charAt(app.lastInptChecked().length)) {
      resolve(app.lastInptChecked().length);
    } else {
      reject([app.lastInptChecked().length, typearea.value.trimStart().charAt(app.lastInptChecked().length)]);
    };
  });
};

typearea.oninput = play;
//get rid of the destroying keys: thoses keys will destroy the formed word
typearea.onkeydown = key => {
  if (key.code === 'Enter' || key.code === 'ArrowUp' || key.code === 'ArrowDown'
    || key.code === 'ArrowLeft' || key.code === 'ArrowRight') return false;
};