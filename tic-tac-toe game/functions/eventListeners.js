document.getElementById('choisesSection1').onclick = _ => {
  if (_.target.localName === 'button') {
    if (_.target.textContent === 'X') {
      game.players.human = 'x';
      game.players.bot = 'o';
    }
    if (_.target.textContent === 'O') {
      game.players.human = 'o';
      game.players.bot = 'x';
    }
    game.turn = 'human';
    document.querySelectorAll('.choise')[0].remove();
    document.getElementById('chosentemplate').style.display = 'block';
  }
}


document.getElementById('choisesSection2').onclick = _ => {
  const grids = document.querySelector('.grids');
  const required = document.querySelector('.required');
  game.level.grids = parseInt(grids[grids.selectedIndex].textContent);
  game.level.required = parseInt(required[required.selectedIndex].textContent)
  game.board = Array.apply(0, Array(Math.pow(game.level.grids, 2)).map((_, index) => index));
  if (_.target.localName === 'button' && _.target.textContent === 'Start!') {
    document.getElementById('init').remove()
    reset()
  }
}

document.getElementById('Gridvalues').onchange = _ => {
  document.getElementById('Requiredvalues').innerHTML = '';
  if (_.target.selectedIndex === 0) {
    document.getElementById('Requiredvalues').innerHTML = '<option value="3">3</option>';
  } else if (_.target.selectedIndex === 1) {
    document.getElementById('Requiredvalues').innerHTML = '<option value="4">4</option><option value="5">5</option>';
  } else if (_.target.selectedIndex === 2) {
    document.getElementById('Requiredvalues').innerHTML = '<option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option>';
  } else if (_.target.selectedIndex === 3) {
    options = ''
    for (let i = 9 - 5; i < 9; i++) options += `<option value="${i}">${i}</option>`;
    document.getElementById('Requiredvalues').innerHTML = options
  }
}