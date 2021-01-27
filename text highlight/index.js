let tool = document.getElementById('highlight');

function highlight(highlight, color) {
  const selectedArea = window.getSelection().getRangeAt(0);
  const textnode = document.createTextNode(selectedArea.toString());
  if (highlight) {
    const element = document.createElement('span');
    element.classList = color;
    selectedArea.deleteContents();
    selectedArea.surroundContents(element);
    element.appendChild(textnode);
  } else {
    const parent = selectedArea.commonAncestorContainer.parentElement;
    //I have to fix a bug, when you choose to unhighlight an unhighlited text
    if(selectedArea.startContainer === selectedArea.endContainer) {
      parent.remove()
    }else {
      selectedArea.deleteContents()
    };

    selectedArea.insertNode(textnode);
    parent.lastChild.childNodes.forEach(e => {
      if (e.nodeName === 'SPAN' && !e.textContent) e.remove();
    })
    parent.normalize();
  };
};

window.onload = _ => {
  fetch(new Request('http://download848.mediafire.com/u6p3t6ee5hpg/oxhcvquhgt0hyie/book.json', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    mode: 'cors',
    cache: 'default'
  }))
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