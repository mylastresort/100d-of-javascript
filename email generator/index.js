let generate= document.getElementById('generate');
let email= document.querySelector('.email');









generate.onclick=function(){
    const xhr =new XMLHttpRequest();
    xhr.onload=function(){
        if (this.status===200){
            var  v=this.responseText;
            console.log(v);
            var emails=JSON.parse(v);
            console.log(emails);
            email.textContent=emails;

        }
        else {
            console.log('Did not receive 200 OK from responce!')
        }
    };
    
    
    
    //to get more infos: https://www.1secmail.com/api/
    xhr.open('get','https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
    xhr.send();
};

