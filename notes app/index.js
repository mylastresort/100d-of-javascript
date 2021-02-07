const section = document.querySelector(".notes-section");
const add = document.getElementById('add');
const typeArea = document.getElementById('typeArea')
const iptcolor = document.getElementById('color')
const iptsize = document.getElementById('select')

iptsize.onchange = _ => typeArea.style.fontSize = iptsize.value
iptcolor.onchange = _ => typeArea.style.color = iptcolor.value

window.onload = _ => show(notes())


let notes = _ => {
  if (!localStorage.getItem('notes') || localStorage.getItem('notes') === "[]") return new Array()
  else return JSON.parse(localStorage.getItem('notes'))
}

class Note {
  constructor(text, color, size) {
    this.text = text;
    this.color = color;
    this.size = size;
  }
}

function save() {
  if (!!typeArea.value) {
    let notesUpdated = notes()
    notesUpdated.push(new Note(typeArea.value, iptcolor.value, iptsize.value))
    localStorage.setItem('notes', JSON.stringify(notesUpdated))
  }
  const newNotesArray = notes().slice(section.childNodes.length)
  show(newNotesArray)
}

function show(listOfNotes) {
  listOfNotes.map(_ => {
    let element = document.createElement('div')
    let elementtxt = document.createTextNode(_.text)
    element.appendChild(elementtxt)
    element.style.fontSize = _.size;
    element.style.color = _.color;
    element.classList = 'notes'
    let deletebtn = document.createElement('button')
    deletebtn.setAttribute('style', 'left: 94%; border-radius:30%; color:darkslategrey; position: absolute; width: 1.5vw; height: 2.5vh; font-size: 18px; background-color: #add8e654; outline: none; border: 0px; box-shadow: #add8e654 0px 0px 2px 3px;')
    deletebtn.textContent = 'x';
    deletebtn.setAttribute('onclick', 'deleteNote(this)')
    element.appendChild(deletebtn)
    section.appendChild(element)
  })
}

function deleteNote(_) {
  const noteIndex = Array.prototype.indexOf.call(_.parentNode.parentNode.childNodes, _.parentNode);
  let notesUpdated = notes();
  notesUpdated.splice(noteIndex, 1)
  localStorage.setItem('notes', JSON.stringify(notesUpdated));
  _.parentNode.remove();
}