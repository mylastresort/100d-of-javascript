const hangmanTied = new Image();
hangmanTied.src = 'https://www.gamestolearnenglish.com/games/hangman/res/mSprite.png';
const hangmanItems = new Image();
hangmanItems.src = 'https://www.gamestolearnenglish.com/games/hangman/res/mySprite.9.0.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const game = {
  animeFails: [
    [hangmanItems, 0, 890, 150, 190, canvas.width * 0.25, canvas.height * 0.79, 200, 200],
    [hangmanItems, 804, 0, 30, 345, canvas.width * 0.35, canvas.height * 0.09, 35, 450],
    [hangmanItems, 490, 610, 260, 30, canvas.width * 0.35, canvas.height * 0.09, 320, 35],
    [hangmanItems, 630, 650, 75, 90, canvas.width * 0.60, canvas.height * 0.25, 75, 90],
    [hangmanItems, 840, 150, 30, 180, canvas.width * 0.60, canvas.height * 0.35, 30, 180],
    [hangmanItems, 190, 735, 70, 140, canvas.width * 0.56, canvas.height * 0.37, 70, 140],
    [hangmanItems, 900, 0, 100, 110, canvas.width * 0.61, canvas.height * 0.37, 100, 110],
    [hangmanItems, 750, 554, 48, 90, canvas.width * 0.57, canvas.height * 0.6, 48, 90],
    [hangmanItems, 150, 890, 50, 100, canvas.width * 0.6, canvas.height * 0.6, 50, 100],
    [hangmanItems, 830, 0, 80, 150, canvas.width * 0.55, canvas.height * 0.12, 80, 150]
  ],
  counter: 0,
  words: ['hello', 'javascript', 'earth', 'april', 'give', 'luck'],
  status: []
}


window.onload = _ => {
  context.drawImage(hangmanItems, 0, 0, 799, 550, 0, 0, canvas.width, canvas.height);
  chosenWord = game.words[Math.floor(Math.random() * 6)];
  chosenWordArayy = chosenWord.split('');
  for (let i of chosenWord) {
    let letter = document.createElement('span');
    letter.id = 'letter';
    letter.textContent = 's';
    document.getElementById('words').appendChild(letter);
  }
  console.log(chosenWord);
}

window.onkeydown = _ => {


  if(!('qwertyuiopasdfghjklzxcvbnm'.split('').some(l=>l===_.key))) return;

  if((document.getElementById('wrong-letters').textContent.split(' ')).some(l=>_.key === l) && game.counter > 10) {
    document.getElementById('ins').textContent = `Be careful, this letter do not exist in this word, I have already memorized it for you.`;
    return;
  } else {
    document.getElementById('ins').textContent = '';
    for (let index in chosenWord) {
      let i = chosenWord[index];
      let e = document.querySelector('#words').children[index];
      if (_.key === i && e.style.color !== 'black') {
        //search the letter in the word
        chosenWordArayy.forEach((value, index) => {
          if (value === _.key) {
            document.querySelector('#words').children[index].textContent = value;
            document.querySelector('#words').children[index].style.color = 'black'
          }
        })
        game.status.push(true);
        return
      } else if (_.key === i && e.style.color === 'black') {
        document.getElementById('ins').textContent = `you already unlocked this letter : ${_.key}`
        return
      } else if (_.key !== i) {
        game.status.push(false);
      }
    }
    if (game.status.some(e => e === false)) {
      let anime = game.animeFails[game.counter];
      context.drawImage(anime[0], anime[1], anime[2], anime[3], anime[4], anime[5], anime[6], anime[7], anime[8]);
      game.counter++;
    }
    if (game.counter >= 10) {
      // game over
      document.querySelector('#words').innerHTML = 'GAME OVER!!'
      document.getElementById('ins').textContent = `The word was ${chosenWord}  ¯\\_(ツ)_/¯`
    }


    if(!chosenWordArayy.some(l=>_.key === l)) {document.getElementById('wrong-letters').textContent += ` ${_.key}`}
  }



}