const api='04c35731a5ee918f014970082a0088b1';
const sort='popularity.desc'
const discover=`https://api.themoviedb.org/3/discover/tv?api_key=${api}&sort_by=${sort}&with_genres=`
const genre=`https://api.themoviedb.org/3/genre/tv/list?api_key=${api}`;
const body=document.body;
const imgurl='https://image.tmdb.org/t/p/w1280';



fetch(genre)
.then(responce=>responce.json())
.then(e=>{
  e.genres.forEach((genre,index)=>{

    let element=document.createElement('div')
    element.setAttribute('id','category')
    let section=document.createElement('span')
    let sectiontxt=document.createTextNode(genre.name)
    section.appendChild(sectiontxt)
    section.setAttribute('id','genre')
    let option=document.createElement('span')
    let optiontxt=document.createTextNode('See all >')
    option.setAttribute('id','more')
    option.appendChild(optiontxt)
    element.appendChild(section)
    element.appendChild(option)

    let result=document.createElement('div')
    result.setAttribute('id','result')
    element.appendChild(result)
    fetch(`${discover}${genre.id}`)
    .then(responce=>responce.json())
    .then(demos=>{
      for(i=0;i<6;i++){
        let demo=document.createElement('span')
        demo.setAttribute('id','demo')
        let add=document.createElement('div')
        let addtxt=document.createTextNode('Add')
        add.appendChild(addtxt)
        add.setAttribute('id','add')
        demo.appendChild(add)
        let img=document.createElement('img')
        img.setAttribute('alt','poster')
        const source=demos.results[i].poster_path
        const name=demos.results[i].name
        img.setAttribute('src',`${imgurl}${source}`)
        demo.appendChild(img)
        let reference=document.createElement('div')
        let referencetxt=document.createTextNode(name)
        reference.appendChild(referencetxt)
        demo.appendChild(reference)
        let result=document.querySelectorAll('#result')
        result[index].appendChild(demo)
      }
    })



    body.appendChild(element)
  })
})