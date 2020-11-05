let table=document.querySelector('.table')
console.log(table);
let email= document.getElementById('email');
const url='https://www.1secmail.com/api/v1/?action=';
const numOfEmails=1;
const service={
  generate:()=>`${url}genRandomMailbox&count=${numOfEmails}`,
  mailbox:id=>{
    if(id>0 && id!==undefined){
      return `${url}getMessages&login=${service.username()}&domain=${service.domain()}&id=${id}`
    }else{
      console.log(email.value);
      return `${url}getMessages&login=${service.username()}&domain=${service.domain()}`
    }
  },
  download:(id, file) =>`${url}download&login=${this.username}&domain=${this.domain}&${id}&file=${file}`
  ,
  username:()=>{return email.value.split('@')[0]},
  domain:()=>{return email.value.split('@')[1]}
}



const ajax=(link,action,condition)=>{
  const xhr=new XMLHttpRequest();
  xhr.onload=function(){
    if(this.status===200){
      var data=JSON.parse(this.responseText)
      switch (action) {
        case 'generate':
          email.value=data
          break;
        case 'checkAll':
          data.forEach((element)=>{
            let message=document.createElement('tr')
            message.setAttribute('id',element.id)
            for(let i=0;i<3;i++){
              let item=document.createElement('th')
              item.setAttribute('id','items')
              let itemtxt=document.createTextNode(Object.values(element)[i+1])
              item.appendChild(itemtxt)
              message.appendChild(item)
            }
            table.appendChild(message)
          })
          break;
        case 'checkOne':
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
