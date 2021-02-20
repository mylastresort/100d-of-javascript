function animateCases(line,group) {
  for (const key in sampleBoard) {
    if (sampleBoard[key].has(line)) {
      aniCases = sampleBoard[key].get(line).get(group);
      break;
    }
  }
  for (const c of aniCases) {
    document.getElementById(c).style.backgroundColor = 'lawngreen'
    document.getElementById(c).classList = 'case animate-flicker'
  }
}