document.getElementById('adding').onclick=function() {
    function gettingTheList() {
        if (localStorage.getItem('TaskList')===null){
            return [];
        }
        else{
            return JSON.parse(localStorage.getItem('TaskList'))
        }
    }
    var TaskList=gettingTheList()
    var newTask=document.getElementById('newTask').value;
    TaskList.push(newTask);
    localStorage.setItem('TaskList',JSON.stringify(TaskList))

};


