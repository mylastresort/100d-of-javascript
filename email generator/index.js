let table=document.querySelector('.table')
let email= document.getElementById('email');
const url='https://www.1secmail.com/api/v1/?action=';
const numOfEmails=1;
let listId=new Array();
const service={
  generate:()=>`${url}genRandomMailbox&count=${numOfEmails}`,
  mailbox:id=>{
    if(id!==undefined){
      return `${url}readMessage&login=${getUser.username()}&domain=${getUser.domain()}&id=${id}`
    }else{
      return `${url}getMessages&login=${getUser.username()}&domain=${getUser.domain()}`
    }
  },
  download:(id, file) =>`${url}download&login=${getUser.username()}&domain=${getUser.domain()}&${id}&file=${file}`
}

const getUser={
  username:()=>{return email.value.split('@')[0]},
  domain:()=>{return email.value.split('@')[1]}
}


const ajax=(link,action,condition)=>{
  const xhr=new XMLHttpRequest();
  xhr.onload=function(){
    if(this.status===200){
      if(this.responseText!=='Message not found'){
        var data=JSON.parse(this.responseText)
      }else{
        return;
      }
      switch (action) {
        case 'generate':
          email.value=data
          break;
        case 'checkAll':
          listId=new Array()
          document.querySelectorAll('tr').forEach(e=>listId.push(e.id))
          data.forEach((element)=>{
            let exist=listId.some(e=>e==element.id)
            if(!exist){
              let message=document.createElement('tr')
              message.setAttribute('id',element.id)
              for(let i=0;i<3;i++){
                let item=document.createElement('th')
                item.setAttribute('id','items')
                let itemtxt=document.createTextNode(Object.values(element)[i+1])
                item.appendChild(itemtxt)
                message.appendChild(item)
              }
              let item=document.createElement('th')
              item.setAttribute('id','items')
              item.innerHTML='<i onclick="expand(this)" style="font-size:100%; opacity:0.7; cursor:pointer;" class="fas fa-angle-right"></i>';
              message.appendChild(item)
              table.appendChild(message)
            }
          })
          break;
        case 'checkOne':
          document.querySelector('.text').childNodes[3].textContent=data.textBody;
          document.querySelector('.attachments').childNodes[3].textContent=data.attachments;
          break;
        case 'download':
          break;
        }
      }else{
      alert('I did not reach the target')
    }
  }
  xhr.open('get',link,condition)
  xhr.send()
}


(function (){
  ajax(service.generate(),'generate',false)
  ajax(service.mailbox(),'checkAll',true)

})();

setInterval(() => {
  ajax(service.mailbox(),'checkAll',false)
}, 500);





function expand(e){
  document.querySelector('.controls').style.marginLeft='11%'
  document.querySelector('.expand').style.width='25vw';
  let messageId=e.parentElement.parentElement.id;
  console.log(messageId);
  ajax(service.mailbox(messageId),'checkOne',true)
}


function copy(){
  document.querySelector('#email').select()
  document.execCommand('Copy')
  document.getElementById('copied').style.opacity=1;
  setTimeout(() => {
    document.getElementById('copied').style.opacity=0;
  }, 1500);
}

//basically the add icon will be just a reason to update the mailbox(its app.generate())



//an example of the messages:
// data=[{
//   "id": 639,
//   "from": "someone@example.com",
//   "subject": "Some subject",
//   "date": "2018-06-08 14:33:55"
// }, {
//   "id": 640,
//   "from": "someoneelse@example.com",
//   "subject": "Other subject",
//   "date": "2018-06-08 14:40:55"
// }]  
