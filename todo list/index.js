// document.getElementById('adding').onclick=function() {
//     function gettingTheList() {
//         if (localStorage.getItem('TaskList')===null){
//             return [];
//         }
//         else{
//             return JSON.parse(localStorage.getItem('TaskList'))
//         }
//     }
//     var TaskList=gettingTheList()
//     var newTask=document.getElementById('newTask').value;
//     TaskList.push(newTask);
//     localStorage.setItem('TaskList',JSON.stringify(TaskList))

// };


const today = new Date()

const weekday = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(today)
const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today)
const date = today.getDate()
const year = today.getFullYear()

const dayLabel = document.getElementById('day')
console.log(weekday);
dayLabel.textContent = weekday


const dateLabel = document.getElementById('date')
dateLabel.textContent = `${month} ${date}, ${year}`