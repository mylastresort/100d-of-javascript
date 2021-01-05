let tool = document.getElementById('highlight');
tool.onmouseover = _ => highlight(true, 'yellow');

function highlight(highlight, color) {
  const selectedArea = window.getSelection().getRangeAt(0);
  const selectedText = selectedArea.toString();
  const textnode = document.createTextNode(selectedText);
  if (highlight) {
    const element = document.createElement('span');
    element.classList = color;
    selectedArea.deleteContents();
    selectedArea.surroundContents(element);
    element.appendChild(textnode);
  } else {
    selectedArea.deleteContents();
    selectedArea.insertNode(textnode);
    let parent = selectedArea.commonAncestorContainer.parentElement;
    parent.normalize();
  };
}

window.onload = _ => {
  fetch('https://download848.mediafire.com/qdfaqo2kd1ng/oxhcvquhgt0hyie/book.json')
    .then(file => file.json())
    .then(e => {
      const cover = document.createElement('div');
      cover.setAttribute('class', 'the-marvelous-book');
      const page = document.createElement('div');
      page.setAttribute('class', 'page');
      const chapnum = document.createElement('h6');
      chapnum.style.marginBottom = '5%';
      const chapname = document.createElement('h6');
      chapname.style.marginBottom = '10%';
      const paragraph = document.createElement('p');
      page.appendChild(chapnum);
      page.appendChild(chapname);
      page.appendChild(paragraph);
      for (let chapter in e.book) {
        let v = page.cloneNode(true)
        v.childNodes[0].textContent = chapter;
        v.childNodes[1].textContent = e.book[chapter].name;
        v.childNodes[2].textContent = e.book[chapter].paragraph;
        cover.appendChild(v);
      };
      let smalltitle = document.createElement('h4');
      smalltitle.style.marginBottom = '10%';
      smalltitle.textContent = 'The Human Machine';
      cover.childNodes[0].insertBefore(smalltitle, cover.childNodes[0].childNodes[0]);
      let arthor = document.createElement('h3');
      arthor.style.marginBottom = '50%';
      arthor.textContent = 'Arnold Bennett';
      cover.childNodes[0].insertBefore(arthor, cover.childNodes[0].childNodes[0]);
      let ref = document.createElement('h3');
      ref.textContent = 'By';
      cover.childNodes[0].insertBefore(ref, cover.childNodes[0].childNodes[0]);
      let bigtitle = document.createElement('h2');
      bigtitle.style.marginBottom = '10%';
      bigtitle.textContent = 'The Human Machine';
      cover.childNodes[0].insertBefore(bigtitle, cover.childNodes[0].childNodes[0]);
      document.body.appendChild(cover);
    })
    .catch(e => console.log(e));
};