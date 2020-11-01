let symbols=[
  '?',
  '.',
  ',',
  '>',
  '<',
  '"',
  ';',
  ':',
  '/',
  '|',
  ']',
  '[',
  '}',
  '{',
  '=',
  '+',
  '_',
  '-',
  ')',
  '(',
  '*',
  '&',
  '^',
  '°',
  '%',
  '§',
  '¥',
  '¢',
  '$',
  '€',
  '£',
  '€',
  '#',
  '@',
  '!',
  '`',
  '~',
]
let numbers=[
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]
let abcs='abcdefghijklmnopqrstuvwxyz';
let abcsA=abcs.toLocaleUpperCase();
let show=document.querySelector('.password')
let pass=new Array();
function generate(){
  let level=document.querySelector('.level').options[document.querySelector('.level').selectedIndex].textContent;
  pass=new Array();
  var charachters={
    symbols,
    numbers,
    abcs,
    abcsA
  }
  for(var i=0;i<Object.keys(charachters).length;i++){
    for (var n=level/Object.keys(charachters).length;n>0;n--){
      var exist=false;
      while(!exist){
        var index=Math.floor(Math.random()* 37)
        var exist=Object.values(charachters)[i][index]!==undefined;
      }
      pass.push(Object.values(charachters)[i][index])
    }
  }
  var strong=new Array();
  for(var i in pass){
    var exist=false;
    while(!exist){
      var index=Math.floor(Math.random()* pass.length)
      var exist=pass[index]!==undefined;
    }
    strong.push(pass[index])
  }
  show.textContent=strong.join('');
}