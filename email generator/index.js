const table = document.querySelector('.table')
const email = document.getElementById('email');

let listId = new Array();

const service = {
  url: 'https://www.1secmail.com/api/v1/?action=',
  emailsRequested: 1,
  username: () => { return email.value.split('@')[0] },
  domain: () => { return email.value.split('@')[1] },
  generate() {
    return `${this.url}genRandomMailbox&count=${this.emailsRequested}`
  },
  mailbox(id) {
    if (id !== undefined) {
      return `${this.url}readMessage&login=${this.username()}&domain=${this.domain()}&id=${id}`
    }
    return `${this.url}getMessages&login=${this.username()}&domain=${this.domain()}`
  },
  download(id, file) {
    return `${this.url}download&login=${this.username()}&domain=${this.domain()}&${id}&file=${file}`
  }
}


const ajax = (link, action, condition) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.status === 200) {
      try {
        var data = JSON.parse(this.responseText)
      } catch (error) {
        console.log('The Message was not found');
        return
      }
      switch (action) {
        case 'generate':
          email.value = data
          localStorage.setItem('previous-email',JSON.stringify(data))
          break;
        case 'checkAll':
          listId = new Array()
          document.querySelectorAll('tr').forEach(e => listId.push(e.id))
          //showing the messages on the window
          data.forEach((element) => {
            if (!listId.some(e => e == element.id)) {
              let message = document.createElement('tr')
              message.setAttribute('id', element.id)
              for (let i = 0; i < 3; i++) {
                let item = document.createElement('th')
                item.setAttribute('id', 'items')
                let itemtxt = document.createTextNode(Object.values(element)[i + 1])
                item.appendChild(itemtxt)
                message.appendChild(item)
              }
              let item = document.createElement('th')
              item.setAttribute('id', 'items')
              item.innerHTML = '<i onclick="expand(this)" style="font-size:100%; opacity:0.7; cursor:pointer;" class="fas fa-angle-right"></i>';
              message.appendChild(item)
              table.appendChild(message)
            }
          })
          break;
        case 'checkOne':
          document.querySelector('.text').childNodes[3].textContent = data.textBody;
          document.querySelector('.attachments').childNodes[3].textContent = data.attachments;
          break;
      }
    } else {
      alert('I did not reach the target')
    }
  }
  xhr.open('get', link, condition)
  xhr.send()
}

(async function () {
  email.value = await JSON.parse(localStorage.getItem('previous-email'))
  ajax(service.mailbox(), 'checkAll', true)
})();

setInterval(() => {
  ajax(service.mailbox(), 'checkAll', false)
}, 500);

function expand(e) {
  document.querySelector('.messages-section').style.marginLeft = '11%'
  document.querySelector('.expand').style.width = '25vw';
  let messageId = e.parentElement.parentElement.id;
  ajax(service.mailbox(messageId), 'checkOne', true)
}

function copy() {
  document.querySelector('#email').select()
  document.execCommand('Copy')
  document.getElementById('copied').style.opacity = 1;
  setTimeout(() => {
    document.getElementById('copied').style.opacity = 0;
  }, 1500);
}
