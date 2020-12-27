const box={
  symbols:['?','.',',','>','<','"',';',':','/','|',']','[','}','{',
  '=','+','_','-',')','(','*','&','^','°','%','§','¥','¢','$','€','£',
  '€','#','@','!','`','~',],
  numbers:['0','1','2','3','4','5','6','7','8','9'],
  abcs:'abcdefghijklmnopqrstuvwxyz',
}


function generate() {
  let level = document.querySelector('.level').options[document.querySelector('.level').selectedIndex].textContent
  let pass = new Array()
  function check(){
    let pack=new Array()
    if (document.getElementById('Upper_abcs').checked) pack.push(box.abcs.toUpperCase())
    if(document.getElementById('Lower_abcs').checked) pack.push(box.abcs)
    if(document.getElementById('Symbols').checked) pack.push(box.symbols)
    if(document.getElementById('Numbers')) pack.push(box.numbers)
    return pack
  }
  const charachters = check()
  for (let i=0;i<charachters.length;i++) {
    for (let n=level/charachters.length;n > 0;n--) {
      let exist = false;
      while (!exist) {
        index = Math.floor(Math.random() * 37)
        exist =charachters[i][index] !== undefined;
      }
      pass.push(charachters[i][index])
    }
  }
  let strong = new Array();
  for (const i in pass) {
    exist = false;
    while (!exist) {
      index = Math.floor(Math.random() * pass.length)
      exist = pass[index] !== undefined;
    }
    strong.push(pass[index])
  }
  document.querySelector('.password').textContent = strong.join('');
}