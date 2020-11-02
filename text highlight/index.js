
let div=document.getElementById('highlight')

div.onmouseover=function(){
  highlight(true,'yellow')
}


function highlight(boolean,color){
  let selectedArea=window.getSelection().getRangeAt(0) 
  let selectedText=window.getSelection().getRangeAt(0).toString()
  let textnode=document.createTextNode(selectedText)
  if(boolean){
    
    
    let element=document.createElement('span')
    let highColor=color || 'yellow';
    element.classList=highColor;
    
    selectedArea.deleteContents()
    selectedArea.surroundContents(element)
    element.appendChild(textnode)
  }else{
    selectedArea.deleteContents()

    selectedArea.insertNode(textnode)





    
    // let parent=selectedArea.commonAncestorContainer.parentElement;
    // parent.rormalize();
  }
}

