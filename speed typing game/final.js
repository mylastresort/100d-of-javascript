//the paragraph to fetch
const text = "because just turn each they order it last not there here need from present plan find develop use will school";

const wordsInterface = document.getElementById('type-area');
const typearea = document.getElementById('words');


function init() {
  if (wordsInterface.childElementCount !== 0) wordsInterface.innerHTML = '';
  //count the words on the paragraph
  textSplited = text.split(' ');
  //create divs for n words
  textSplited.forEach((value, index) => {
    const wordElement = document.createElement('div');
    wordElement.setAttribute('id', `Div.${index}`);
    wordElement.classList = 'app';
    //create spans for each letter
    for (const letter of value) {
      let letterElement = document.createElement('span');
      letterElement.classList = 'normal';
      let letterString = document.createTextNode(letter);
      letterElement.appendChild(letterString);
      wordElement.appendChild(letterElement);
    }
    let falseLetter = document.createElement('span');
    falseLetter.classList = 'fix';
    wordElement.appendChild(falseLetter);
    wordsInterface.appendChild(wordElement);
  })
  //set the bar at the first word
  document.getElementById('Div.0').style.borderBottom = "#646669 2.5px solid";
  typearea.value = '';
  app.counter = 0
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
      if (letter.classList.value !== 'normal') lastInpt += letter.textContent;
    };
    return lastInpt;
  },
  wordElement() {
    return document.getElementById(`Div.${this.counter}`);
  },
  letters() {
    return document.getElementById(`Div.${this.counter}`).childNodes;
  },
  current() {
    return textSplited[this.counter];
  }
};


typearea.onkeyup = debounce(function (key) {
  document.getElementById('score').textContent = `Score : ${app.score}/20`
  new Promise((resolve, reject) => {
    if (key.key === ' ') {
      resolve('space');
    } else if (typearea.value.trimStart().length > app.current().length
      && key.key !== 'Backspace'
      && key.key !== ' ') {
      resolve('bug');
    } else if (key.key === 'Backspace') {
      resolve('delete');
    } else if (typearea.value.trimStart().charAt(app.lastInptChecked().length) === app.current().charAt(app.lastInptChecked().length)) {
      resolve(app.lastInptChecked().length);
    } else {
      reject([
        app.lastInptChecked().length,
        typearea.value.trimStart().charAt(app.lastInptChecked().length)
      ]);
    };
  })
    //show the letter in the correct form
    .then(arg => {
      if (arg === 'space' || arg === 'delete' || arg === 'bug') return arg;
      //then the arg is the position
      app.letters()[arg].classList = 'true';
    })
    .then(arg => {
      if (arg === 'space') {
        if (typearea.value.trim() === app.current()) app.score++;
        app.counter++;
        typearea.value = ' ';
        document.getElementById(`Div.${app.counter - 1}`).style.borderBottom = "";
        document.getElementById(`Div.${app.counter}`).style.borderBottom = "#646669 2.5px solid";
      } else if (arg === 'delete') {
        if (!!app.counter && !typearea.value.length) {
          app.letters()[0].textContent = app.current().charAt(0);
          app.letters()[0].classList = 'normal';
          app.counter--;
          typearea.value = ' '.concat(app.lastInptChecked());
          document.getElementById(`Div.${app.counter}`).style.borderBottom = "#646669 2.5px solid";
          document.getElementById(`Div.${app.counter + 1}`).style.borderBottom = "";
        } else if (typearea.value.trimStart().length - 1 >= app.current().length) {
          app.wordElement().lastChild.textContent = app.wordElement().lastChild.textContent.slice(0, -1)
        } else {
          let position = app.lastInptChecked().length - 1;
          app.letters()[position].textContent = app.current().charAt(position);
          app.letters()[position].classList = 'normal';
        };
      } else if (arg === 'bug') {
        app.wordElement().lastChild.textContent += typearea.value.slice(-1);
      }
    })
    //show the false letters
    .catch(args => {
      const [position, letter] = args;
      // app.letters()[position].textContent = letter;
      app.letters()[position].classList = 'false';
    })
    .catch(err => console.log(err));
}, 2);


//get rid of the destroying keys: thoses keys will destroy the formed word
typearea.onkeydown = key => {
  if (key.code === 'Enter' || key.code === 'ArrowUp' || key.code === 'ArrowDown'
    || key.code === 'ArrowLeft' || key.code === 'ArrowRight' || key.key === ' ') return false;
};

document.getElementById('reload').onclick = init

window.onload = init
