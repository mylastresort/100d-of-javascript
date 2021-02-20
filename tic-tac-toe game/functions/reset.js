function reset() {
  round = 0;
  board = Array.apply(0, Array(Math.pow(game.level.grids, 2))).map((_) => " ");
  game.turn = "human";
  let app = document.createElement("div");
  app.setAttribute("class", "app");
  app.setAttribute("id", "app");
  document.body.appendChild(app);
  generateMemory(
    game.level.grids,
    game.level.required,
    game.inputs.list.lines,
    game.inputs.list.colomuns,
    game.inputs.list.reverseL,
    game.inputs.list.reverseR,
    false
  );
  generateMemory(
    game.level.grids,
    game.level.required,
    game.algo.list.lines,
    game.algo.list.colomuns,
    game.algo.list.reverseL,
    game.algo.list.reverseR,
    true
  );
  let deadline = 0;
  while (deadline < Math.pow(game.level.grids, 2)) {
    let element = document.createElement("span");
    element.setAttribute("id", deadline);
    element.classList = "case";
    element.setAttribute("onclick", "move(this)");
    let img = document.createElement("img");
    element.appendChild(img);
    document.body.querySelector(".app").appendChild(element);
    deadline++;
  }
  document.getElementById(
    "app"
  ).style.gridTemplateColumns = `repeat(${game.level.grids},1fr)`;
  document.getElementById(
    "app"
  ).style.gridTemplateRows = `repeat(${game.level.grids},1fr)`;

  choice = undefined;
  lastInpt = Math.pow(game.level.grids, 2) - 1;
}
