let months = document.getElementById('months');
days = document.getElementById('days');
hours = document.getElementById('hours');
minutes = document.getElementById('minutes');
seconds = document.getElementById('seconds');






let final=new Date(2024,0,0);


//the time with miliseconds
final =Date.parse(final)
//converting it to seconds using math.floor
final =Math.floor(final/1000)



setInterval(()=>{
  let current=Date.now();
  current=Math.floor(current/1000);
  var timeLeft=final-current;

  let days=Math.floor(timeLeft/(60*60*24))
  let hours=Math.floor((timeLeft/((60*60))%24));
  let minutes=Math.floor((timeLeft/60)%60);
  let seconds=Math.floor(timeLeft%60)

  this.days.textContent=days;
  this.seconds.textContent=seconds;
  this.minutes.textContent=minutes;
  this.hours.textContent=hours;


}, 500);