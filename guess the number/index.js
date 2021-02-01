let numbers = _ => {
  let num = '#JSGF V1.0; grammar colors; public <color> = 1 ';
  for (let i = 2; i <= 100; i++) {
    num = `${num}| ${i} `;
  }return `${num};`;
}

let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
let speechRecognitionList = new webkitSpeechGrammarList() || new SpeechRecognition();
speechRecognitionList.addFromString(numbers());
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


let guessedNum = Math.floor(Math.random() * 101);
console.log('The number to guess is', guessedNum);

document.getElementById('hints').onclick = _ => {
  if (document.getElementById('hints').textContent === 'START!') {
    document.getElementById('hints').style.cursor = 'default';
    document.getElementById('hints').style.opacity = 0;
    document.getElementById('hints').textContent = 'Listening...';
    document.getElementById('hints').style.opacity = 1;
    recognition.start();
  }
}

recognition.onresult = _ => {
  console.log(_.results[0][0].transcript);
  let number = parseInt(_.results[0][0].transcript.split(' ')[0]);
  document.getElementById('hints').style.opacity = 0;
  if (isNaN(number)) {
    document.getElementById('hints').textContent = `${_.results[0][0].transcript} is not a number`;
  } else if (number <= 0) {
    document.getElementById('hints').textContent = `${number} is less than 1`;
  } else if (number >= 101) {
    document.getElementById('hints').textContent = `${number} is greater than 100`;
  } else if (number > guessedNum) {
    document.getElementById('hints').textContent = `GO LOWER !!`;
  } else if (number < guessedNum) {
    document.getElementById('hints').textContent = `GO HIGHER !!`;
  } else if (number === guessedNum) {
    document.getElementById('hints').textContent = `WELL DONE. IT'S THE RIGHT NUMBER`;
  }
  document.getElementById('hints').style.opacity = 1;
}

recognition.onnomatch = _ => {
  document.getElementById('hints').style.opacity = 0;
  document.getElementById('hints').textContent = 'Speech not recognized';
  document.getElementById('hints').style.opacity = 1;

}

recognition.onend = _ => {
  recognition.stop();
  recognition.start();
}

